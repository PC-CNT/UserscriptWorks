// ==UserScript==
// @name            plsDirectJump
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.7.8
// @description     This is a script (planned) to remove cushion pages such as 2ch.net and FC2 Wiki from <a href> so that you can jump directly to them.
// @description:ja  <a href>から2ch.netやFC2 Wikiなどのクッションページを削除して直接飛ぶようにするスクリプト（の予定）です。
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @match           *://*/*
// @match           *://www.youtube.com/watch?v=*
// @match           *://steamcommunity.com/*
// @grant           none
// ==/UserScript==


( () => {
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


    function youtube() {
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
        const config = {childList: true, subtree: true}

        const observer = new MutationObserver(() => {
            const content_text = document.querySelectorAll("#content-text");
            if ((content_text) && (content_text.length)) {
                content_text.forEach(block => {
                    block.querySelectorAll("a").forEach(function(value) {
                        const a_text = value.innerText;
                        if (isURL(a_text)) {
                            // console.info("value:", value);
                            value.classList.remove("yt-simple-endpoint");
                            value.style.textDecoration = "none";
                            value.setAttribute("href", a_text);
                            value.setAttribute("target", "_blank");
                            value.setAttribute("rel", "noopener noreferrer");
                        }
                    });
                });
            }

            document.querySelectorAll(`a`).forEach((ra) => {
                if (ra.href.match(/https:\/\/www\.youtube\.com\/redirect\?.+/)) {
                    // https://www.youtube.com/redirect?event=video_description&redir_token=rrrrr&q=https%3A%2F%2Fexample.com%2F&v=RgFaK6ZQifE
                    ra.href = decodeURIComponent(ra.href.match(/&q=([^&]+)/)[1]);
                    // console.log(ra.href)
                }
            })
        });
        observer.observe(target, config);
    }

    const okwave = () => {
        const target = document.querySelector(`body`)
        const config = {childList: true, subtree: true}

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
        const config = {childList: true, subtree: true}

        const observer = new MutationObserver(() => {
            const al = document.querySelectorAll(`a`);
            al.forEach((value) => {
                if (value.href.match(/^https?:\/\/.+\.2chan\.net\/bin\/jump\.php\?/)) {
                    value.setAttribute("href", decodeURIComponent(value.href.replace(/^https?:\/\/.+\.2chan\.net\/bin\/jump\.php\?/, "")));
                    value.setAttribute("rel", "noopener noreferrer");
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
                        value.setAttribute("rel", "noopener noreferrer");
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
                    value.setAttribute("rel", "noopener noreferrer");
                }
                if (url_source_abs.match(/^https?:\/\/link\.zhihu\.com\/\?target=.+/)) {
                    // * 知乎
                    // * (https://link.zhihu.com/?target=https%3A//example.com/)
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https?:\/\/link\.zhihu\.com\/\?target=/, "")));
                    value.setAttribute("target", "_blank");
                }
            }
        });
    }

    if (location.host.match(/^www\.youtube\.com/)) {
        youtube();
    } else if (location.host.match(/^okwave\.jp/)) {
        okwave();
    } else if (location.host.match(/^.+\.2chan\.net/)) {
        futaba();
    } else {
        others();
    }

})();