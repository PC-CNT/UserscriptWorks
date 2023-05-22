// ==UserScript==
// @name            Tweet_exporter
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.1.15
// @description:ja  任意のツイートを文章と画像ごとzipにまとめてダウンロードする！
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/Tweet_exporter/Tweet_exporter.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/Tweet_exporter/Tweet_exporter.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @match           https://twitter.com/*
// @match           https://mobile.twitter.com/*
// @grant           none
// @require         https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js
// ==/UserScript==


/*

TODO: 不具合多数（大体アプデのせい）

TODO: 数が2重で取得されるのをなおす（div[data-testid="retweet"], div[data-testid="like"]の修正）

TODO: リンクがおかしい（詳しくはtxtを参照）

TODO: 改行が曖昧なのをどうにかしたい ← 多分いけた

TODO: if文地獄たすけて

TODO: すごいバグるOGPの対応（aria-labelledby="id__\w+"）

TODO: 引リツがバグる

TODO: フォーマット関連の修正

*/

(() => {
    "use strict";
    console.log("===START UserscriptWorks/Tweet_exporter===");

    const flag_debug = false;

    const DEBUG = (msglist) => {
        if (!flag_debug) {
            return;
        }
        console.group(msglist[0]);
        msglist.slice(1).forEach(msg => {
            console.info(msg);
        });
        console.groupEnd();
    };

    //* なんかよく分からないけどhtml2canvasで出力した画像が真っ白だった
    //! html2canvasではなくtwitter側が悪かった（Content Security Policyなるものがdata:image…のURLを弾いていたせいで画像が取得できてなかったっぽい）
    const export_tweet = (article_element) => {

        article_element.querySelector(`.export-tweet`).style.display = "none";

        const zip = new JSZip();
        domtoimage.toJpeg(article_element).then(blob => {
            zip.file("screenshot.jpg", blob.split(",")[1], {
                base64: true
            });
            let _tweet_text = "";
            let current_group = null;
            let _end = "\n";
            let flag_multi_div = false;
            const is_url_single = (/^https?:\/\/twitter.com\/\w+\/status\/\d+/).test(location.href);
            //* span:not(span span)にすることで"<span><span>テキスト</span></span>"のような場合にテキストが二重で出力されるのを防ぐ
            //! aria-hidden="true"が付いているspanはリンク（t.co）の代替テキストなので除外する ~~下のif文でクラスを使用して重複を避けたのでいらない~~ やっぱいる
            //? article_element.querySelectorAll(`span:not(span span, span[aria-hidden="true"]), time, a[dir="ltr"][rel="noopener noreferrer"][target="_blank"][role="link"], img, div[data-testid="retweet"], div[data-testid="like"]`).forEach(content => {
            //? article_element.querySelectorAll(`span:not(span span, span[aria-hidden="true"]), time, a[dir="ltr"][rel="noopener noreferrer"][target="_blank"][role="link"], img, div[aria-label][id]`).forEach(content => {
            //? article_element.querySelectorAll(`span:not(span[aria-hidden="true"]), time, a[dir="ltr"][rel="noopener noreferrer"][target="_blank"][role="link"], img, div[aria-label][id], video`).forEach(content => {
            article_element.querySelectorAll(`span:not(span[aria-hidden="true"]), time, a[dir="ltr"][target="_blank"][role="link"], img, div[aria-label][id], video`).forEach(content => {
                DEBUG([`content`, content]);

                //! ここから${_end}の分岐
                //* 1つの要素に属している場合 => 後ろに要素がある場合は改行をしない
                if (content.nextElementSibling) {
                    _end = "";
                } else if (content.closest("a") && content.closest("a").getAttribute("href").match(/^\/\w+\/status\/\d+\/(retweets|with_comments|likes)/)) {
                    //* リツイートやいいねの部分は改行をしない
                    if (current_group === content.closest("a").getAttribute("href")) {
                        _end = " ";
                    }
                    current_group = content.closest("a").getAttribute("href");
                    _end = " ";
                } else {
                    _end = "\n";
                }
                //! ここまで${_end}の記述

                if (content.tagName === "A" && content.href.match(/^https?:\/\/t\.co\/\w+/)) {
                    //* ツイートに含まれるリンクは自動的にt.coの短縮リンクになるのでaタグから正規表現で絞る
                    // _tweet_text += `${content.href}\n`;
                    //* 非表示のテキストに元のリンクが書いてあるっぽい？
                    _tweet_text += `${content.text.replace(/^(.+)…/, "$1")}\n`;
                }

                if (content.closest(`div[role="button"]`)) {
                    //* 翻訳とALTの部分を除外
                    DEBUG([`button`, content.innerText])
                    return;
                }

                if (content.closest(`div[data-testid="card.wrapper"]`)) {
                    //* Twitter Cardを除外 つべの埋め込みとかも除外できるっぽい
                    return;
                }

                if (content.tagName === "SPAN" && content.tagName === content.parentNode.tagName) {
                    //* querySelectorAllから(span:not(span span))を消した代わりにここで重複を除外
                    return;
                }

                if (content.tagName === "TIME") {
                    //* <time>要素 正確な時間はdatetime属性で取得できる（シングルには存在しない） https://developer.mozilla.org/ja/docs/Web/HTML/Element/time
                    //! tagNameは全部大文字の"TIME"らしい "time"だと思ってたせいで結構沼った
                    _tweet_text += (`${content.getAttribute("datetime")}\n\n`);
                } else if (content.parentNode.hasAttribute("aria-hidden") && content.parentNode.getAttribute("aria-hidden") === "true") {
                    //* 「·」←これ
                    // _tweet_text += (`${content.innerText}`);
                    _tweet_text += (``);
                } else if (!is_url_single && content.closest(`div[aria-label][id]`)) {
                    //* 単独ではない場合div[aria-label][id]のaria-lbelでRTとFav数が取得できる
                    if (!flag_multi_div) {
                        _tweet_text += content.closest(`div[aria-label][id]`).getAttribute("aria-label");
                        flag_multi_div = true;
                    }
                    return;
                } else if ((content.hasAttribute("src")) && (content.getAttribute("src").match(/^https?:\/\/.*\.twimg\.com\/emoji\//))) {
                    //* 絵文字 imgの中にsvgがある
                    DEBUG([`${content.tagName}`, `${content.getAttribute("alt")}`]);
                    _tweet_text += (`${content.alt}${_end}`);
                } else if (content.tagName === "SPAN" && content.innerText !== "") {
                    //* 通常のテキスト これが最後に来るようにする！
                    DEBUG([`${content.tagName}`, `${content.innerText}`]);
                    _tweet_text += (`${content.innerText}${_end}`);
                }

                // if (content.hasAttribute("aria-hidden") && content.getAttribute("aria-hidden") === "true") {
                //     //* リンクの代替テキストを除外
                //     return;
                // }

                if (content.hasAttribute("src") && (content.getAttribute("src").match(/^https?:\/\/pbs\.twimg\.com\/media\//))) {
                    //* 添付画像
                    //* urlの末尾に&name=origをつけると元のサイズの画像を取得できる
                    DEBUG([`${content.tagName}`, `${content.getAttribute("src").split("&")[0] + "&name=orig"}`]);
                    _tweet_text += (`${content.getAttribute("src").split("&")[0] + "&name=orig"}\n`);
                    zip.file(`${content.closest("a").getAttribute("href").split("/").pop()}.jpg`, JSZipUtils.getBinaryContent(content.getAttribute("src").split("&")[0] + "&name=orig"), {
                        binary: true
                    });
                }

                if (content.tagName === "VIDEO" && content.getAttribute("src").match(/^https:\/\/video\.twimg\.com\/tweet_video\/.+\..+/)) {
                    //* gif（gifではない）
                    zip.file(`${content.src.replace(/^https:\/\/video\.twimg\.com\/tweet_video\//, "")}`, JSZipUtils.getBinaryContent(content.src), {
                        binary: true
                    });
                }

                if (content.hasAttribute("src") && content.getAttribute("src").match(/^https?:\/\/pbs\.twimg\.com\/profile_images\/\d+\/\S+_\S+\.(jpg|png|gif)/)) {
                    //* プロフィール画像 ~~たぶん.*_normal.jpgが一番大きい……はず~~ ←そうでもなかった
                    zip.file(`icon.${(/^https?:\/\/pbs\.twimg\.com\/profile_images\/\d+\/\S+_\S+\.(jpg|png|gif)/).exec(content.getAttribute("src"))[1]}`, JSZipUtils.getBinaryContent(content.getAttribute("src").replace("_normal", "")), {
                        binary: true
                    });
                    DEBUG([`${content.tagName}`, `${content.getAttribute("src")}`]);
                }

                if (content.getAttribute("data-testid") === "retweet" || content.getAttribute("data-testid") === "like") {
                    DEBUG([`${content.tagName}`, `${content.getAttribute("data-testid")}`]);
                    _tweet_text += (`${content.getAttribute("data-testid")}\n`);
                }

            });

            DEBUG([`_tweet_text`, _tweet_text]);
            zip.file("tweet.txt", _tweet_text);

            if (window.navigator.userAgent.match(/Windows NT/)) {
                //* https://developer.mozilla.org/ja/docs/Web/API/Navigator/userAgent
                zip.file(`${document.title.replaceAll(/(\\|\/|:|\*|\?|"|>|<|\|)/g, "-")}.url`, `[InternetShortcut]\nURL=${location.href}`);
            }

            zip.generateAsync({
                type: "blob",
                compression: 'DEFLATE'
            }).then(content => {
                if (article_element.querySelector(`a[dir="auto"][role="link"] > time`)) {
                    const _tweet_link = article_element.querySelector(`a[dir="auto"][role="link"] > time`).parentNode.href;
                    saveAs(content, (`${_tweet_link.split("/").pop()}_@${_tweet_link.split("/")[3]}_${document.title}.zip`));
                } else {
                    saveAs(content, (`${location.pathname.split("/").pop()}_@${location.pathname.split("/")[1]}_${document.title}.zip`));
                    // saveAs(content, (`${location.pathname.split("/").pop()}_@${location.pathname.split("/")[1]}_${document.title}.zip`));
                    // let _tweet_link = article_element.querySelector(`div[dir="auto"] a[role="link"]:not(a[target="_blank"])`).href;
                    // saveAs(content, (`${_tweet_link.split("/").pop()}_@${_tweet_link.split("/")[3]}.zip`))
                }
            }).then(() => {
                article_element.querySelector(`.export-tweet`).style.display = "";
            })
        })
    };


    const target = document.body;
    const config = {
        childList: true,
        subtree: true
    };
    const observer = new MutationObserver(() => {
        //* ふぁぼとかの列（idが毎回変わるのでidで指定できないという悲しみ）
        const groups = document.querySelectorAll("div[role='group']");
        groups.forEach(group => {
            if (!location.href.match(/^https?:\/\/(\w+\.)?twitter\.com\/.+\/status\/\d+/)) {
                return;
            }
            // if (location.href.match(/^https?:\/\/twitter\.com\/.*\/status\/\d+\/photo\//)) {
            //     return;
            // }
            //* 余計なdivを弾く（div[data-testid="sheetDialog"は非ログイン時に出てくるダイアログ、
            //* div[data-testid="confirmationSheetDialog"]はWelcome! Now you can Follow them.のやつ）
            //* selectは垢を作るときの生年月日選択
            if (
                (group.querySelector("div[role='menu']")) ||
                (group.querySelector("div[role='dialog']")) ||
                (group.querySelector(`div[data-testid="sheetDialog"]`)) ||
                (group.querySelector(`div[data-testid="confirmationSheetDialog"]`)) ||
                (group.querySelector(`select`)) ||
                (group.querySelector(`div[role="separator"]`)) ||
                (group.querySelector(`div[data-testid="Carousel-NavRight"]`)) ||
                (group.querySelector(`div[data-testid="Carousel-NavLeft"]`))
            ) {
                return;
            }
            //* 既に追加済みなら何もしない
            if (
                // 6 <= group.childElementCount ||
                group.classList.contains("tweet-exporter-added")
            ) {
                return;
            }
            group.classList.add("tweet-exporter-added");
            const _sharemenu_div = group.lastElementChild;
            const _export_div = _sharemenu_div.cloneNode(true);
            _export_div.querySelector("svg").innerHTML = `<g transform="rotate(180, 12, 8.4)"><path d="M17.53 7.47l-5-5c-.293-.293-.768-.293-1.06 0l-5 5c-.294.293-.294.768 0 1.06s.767.294 1.06 0l3.72-3.72V15c0 .414.336.75.75.75s.75-.336.75-.75V4.81l3.72 3.72c.146.147.338.22.53.22s.384-.072.53-.22c.293-.293.293-.767 0-1.06z"></path></g><g><path d="M19.708 21.944H4.292C3.028 21.944 2 20.916 2 19.652V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 .437.355.792.792.792h15.416c.437 0 .792-.355.792-.792V14c0-.414.336-.75.75-.75s.75.336.75.75v5.652c0 1.264-1.028 2.292-2.292 2.292z"></path></g>`;
            _export_div.classList.add("export-tweet");
            group.insertAdjacentElement("beforeend", _export_div);
            group.lastElementChild.addEventListener("click", (e) => {
                e.stopPropagation();
                //* <article>
                export_tweet(group.closest("article"));
            });
        });
    });
    observer.observe(target, config);

    console.log("===END UserscriptWorks/Tweet_exporter===");
})();