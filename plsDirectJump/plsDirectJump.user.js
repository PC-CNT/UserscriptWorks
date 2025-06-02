// ==UserScript==
// @name            plsDirectJump
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2025.06.02.2200
// @description:ja  <a href>から2ch.netやFC2 Wikiなどのクッションページを削除して直接飛ぶようにするスクリプト（の予定）です。
// @author          PC-CNT
// @license         MIT
// @match           *://*/*
// @match           *://www.youtube.com/watch?v=*
// @match           *://steamcommunity.com/*
// @match           *://www.pixiv.net/*
// @grant           none
// ==/UserScript==


(() => {
    "use strict";

    function fixPrefix(url) {
        if (url.match(/^https?:\/\//)) {
            return url;
        } else {
            return "//" + url;
        }
    }

    function isURL(text) {
        if (text.match(/^https?:\/\//) && !(text.match(/^[0-9]{1,2}:[0-9]{2}/))) {
            return true;
        } else {
            return false;
        }
    }


    function youtube_comment() {
        //* YouTube（米欄）
        //* (https://www.youtube.com/watch?v=1X2TwPb3y10)
        //! 以下メモ
        //* #comments -> #sections -> #contents:米全体 -> ytd-comment-thread-renderer:米一つずつ
        //* -> #comment -> #body -> #main -> #expander -> #content -> #content-text -> spanまたはa
        //* class="style-scope ytd-comment-renderer"
        //* "yt-confirm-dialog-renderer" 警告のダイアログ （desktop_polymer.jsに書いてあるけど全然わからん）
        //* .yt-simple-endpoint このクラスがついてるとダイアログでる
        //! ここまでメモ

        const target = document.getElementById("content")
        // const target = document.body;
        const config = {
            childList: true,
            subtree: true
        }

        const observer = new MutationObserver(() => {
            const content_text = document.querySelectorAll("#content-text");
            if ((content_text) && (content_text.length)) {
                content_text.forEach(block => {
                    block.querySelectorAll("a").forEach(function(value) {
                        const a_text = value.innerText;
                        if (isURL(a_text)) {
                            value.classList.remove("yt-simple-endpoint");
                            value.style.textDecoration = "none";
                            value.setAttribute("href", a_text);
                            value.setAttribute("target", "_blank");
                        }
                    });
                });
            }

            document.querySelectorAll(`a`).forEach((ra) => {
                if (ra.href.match(/https:\/\/www\.youtube\.com\/redirect\?.+/)) {
                    // https://www.youtube.com/redirect?event=video_description&redir_token=rrrrr&q=https%3A%2F%2Fexample.com%2F&v=RgFaK6ZQifE
                    ra.href = decodeURIComponent(ra.href.match(/&q=([^&]+)/)[1]);
                }
            })
        });
        observer.observe(target, config);
    }

    function youtube() {
        const _r = /^https?:\/\/www\.youtube\.com\/redirect\?q=/
        if (location.href.match(_r)) {
            location.href = location.href.replace(_r, "");
        }
    }

    const okwave = () => {
        const target = document.querySelector(`body`)
        const config = {
            childList: true,
            subtree: true
        }

        const observer = new MutationObserver(() => {
            const al = document.querySelectorAll(`a`);
            al.forEach((value) => {
                if (value.href.match(/^https:\/\/okwave\.jp\/jump\?url=.+/)) {
                    // * OKWAVE
                    // * (https://okwave.jp/jump?url=https%3A%2F%2Fexample.com%2F)
                    value.setAttribute("href", decodeURIComponent(value.href.replace(/^https:\/\/okwave\.jp\/jump\?url=/, "")));
                } else {
                    observer.disconnect();
                }
            });
        });

        observer.observe(target, config);
    }

    const futaba = () => {
        //* ふたば☆ちゃんねる
        //* (https://www.2chan.net/bin/jump.php?https://example.com)
        const target = document.querySelector(`html`)
        const config = {
            childList: true,
            subtree: true
        }

        const observer = new MutationObserver(() => {
            const al = document.querySelectorAll(`a`);
            al.forEach((value) => {
                if (value.href.match(/^https?:\/\/.+\.2chan\.net\/bin\/jump\.php\?/)) {
                    value.setAttribute("href", decodeURIComponent(value.href.replace(/^https?:\/\/.+\.2chan\.net\/bin\/jump\.php\?/, "")));
                }
            });
        });
        observer.observe(target, config);
    }

    function pixiv() {
        // * Pixiv
        // * https://www.pixiv.net/jump.php?https%3A%2F%2Fexample.com
        const target = document.querySelector(`html`)
        const config = {
            childList: true,
            subtree: true,
        }

        const observer = new MutationObserver(() => {
            const al = document.querySelectorAll(`a`);
            al.forEach((value) => {
                if (value.href.match(/^https?:\/\/www\.pixiv\.net\/jump\.php\?(?:url=)?.+/)) {
                    value.setAttribute("href", decodeURIComponent(value.href.match(/https?:\/\/www\.pixiv\.net\/jump\.php\?(?:url=)?(.+)/)[1]));
                }
            });
        });

        observer.observe(target, config);
    }

    function commons_nico() {
        // * ニコニ・コモンズ
        // * https://commons.nicovideo.jp/gw?url=https%3A%2F%2Fexample.com
        const target = document.querySelector(`body`)
        const config = {
            childList: true,
            subtree: true
        }

        const observer = new MutationObserver(() => {
            const al = document.querySelectorAll(`a`);
            al.forEach((a) => {
                if (a.href.match(/^https:\/\/commons\.nicovideo\.jp\/gw\?url=/)) {
                    // *innerTextでいいかも
                    a.setAttribute("href", decodeURIComponent(a.href.match(/^https:\/\/commons\.nicovideo\.jp\/gw\?url=(.+)&ref=.+/)[1]));
                }
            });
        });

        observer.observe(target, config);
    }


    function others() {
        document.querySelectorAll("a").forEach(function(value) {
            const url_source_abs = value.href;
            const url_source_rel = value.getAttribute("href")
            //TODO: hrefの編集
            if (url_source_abs) {
                if (url_source_abs.match(/^https?:\/\/jump.(2|5)ch\.net\/\?.+/)) {
                    //* 2ちゃんねる
                    //* (https://jump.5ch.net/?http://example.com/, jump.2ch.net/?,)
                    value.setAttribute("href", fixPrefix(url_source_abs.replace(/^https?:\/\/jump.(2|5)ch\.net\/\?/, "")));
                }
                if (url_source_abs.match(/^https?:\/\/www\.pinktower\.com\/\?.+/)) {
                    //* PINKちゃんねる
                    //* (https://www.pinktower.com/?https://example.com/)
                    value.setAttribute("href", fixPrefix(url_source_abs.replace(/^https?:\/\/www\.pinktower\.com\/\?/, "")));
                }
                if (location.hostname.match(/^.+\.wiki\.fc2\.com/)) {
                    //* FC2 Wiki
                    //* (https://example.wiki.fc2.com/jump/https/example.com%2exapmple)
                    if (url_source_rel.match(/^\/jump\/https?\/.*/)) {
                        value.setAttribute("href", decodeURIComponent(url_source_rel.replace(/^\/jump\/(https?)\//, "$1://")));
                        value.setAttribute("target", "_blank");
                    }
                }
                if (url_source_abs.match(/^https?:\/\/kakaku\.com\/jump\/\?url=.*/)) {
                    //* 価格.com
                    //* (https://kakaku.com/jump/?url=https%3A%2F%2Fwww%2Eexample%2Ecom%2F)
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https?:\/\/kakaku\.com\/jump\/\?url=/, "")));
                }
                if (url_source_abs.match(/^https:\/\/steamcommunity\.com\/linkfilter\/\?url=/)) {
                    //* Steam
                    //* (https://steamcommunity.com/linkfilter/?url=https://example.com/)
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https:\/\/steamcommunity\.com\/linkfilter\/\?url=/, "")));
                }
                if (url_source_abs.match(/^https:\/\/re\.wikiwiki\.jp\//)) {
                    //* Wikiwiki
                    //* (https://re.wikiwiki.jp/?http://example.com/)
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https:\/\/re\.wikiwiki\.jp\/\?/, "")));
                    value.setAttribute("target", "_blank");
                }
                if (url_source_abs.match(/^https?:\/\/link\.zhihu\.com\/\?target=.+/)) {
                    // * 知乎
                    // * (https://link.zhihu.com/?target=https%3A//example.com/)
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https?:\/\/link\.zhihu\.com\/\?target=/, "")));
                    value.setAttribute("target", "_blank");
                }
                if (url_source_abs.match(/^https?:\/\/piapro\.jp\/jump\//)) {
                    // * piapro
                    // * https://piapro.jp/jump/?url=https%3A%2F%2Fexample.com
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https?:\/\/piapro\.jp\/jump\/\?url=/, "")));
                }
                if (url_source_abs.match(/^https:\/\/dova-s\.jp\/_contents\/author\/jump\.html\?num=[0-9]+/)) {
                    // * DOVA-SYNDROME
                    // * https://dova-s.jp/_contents/author/jump.html?num=089
                    value.setAttribute("href", value.innerText);
                }
            }
        });
    }

    if (location.host.match(/^www\.youtube\.com/)) {
        youtube();
    }
    if (location.host.match(/^okwave\.jp/)) {
        okwave();
    }
    if (location.host.match(/^.+\.2chan\.net/)) {
        futaba();
    }
    if (location.host.match(/^www\.pixiv\.net/)) {
        pixiv();
    }
    if (location.host.match(/^commons\.nicovideo\.jp/)) {
        commons_nico()
    }
    others();

})();
