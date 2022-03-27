// ==UserScript==
// @name            plsDirectJump
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.3.0
// @description     This is a script (planned) to remove cushion pages such as 2ch.net and FC2 Wiki from <a href> so that you can jump directly to them.
// @description:ja  <a href>から2ch.netやFC2 Wikiなどのクッションページを削除して直接飛ぶようにするスクリプト（の予定）です。
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @include         *://*
// @include         https://www.youtube.com/watch?v=*
// @include         https://steamcommunity.com/*
// @grant           none
// ==/UserScript==


( () => {
    "use strict";

    console.log("===START UserscriptWorks/plsDirectJump===");

    const flag_debug = false;

    function http_https(host) {
        if (host.match("https")) {
            return "https";
        } else {
            return "http";
        }
    }

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

    //* 配列の先頭をタイトルとしたconsole.groupの表示
    function debug(msglist) {
        if (!flag_debug) {
            return;
        }
        console.group(msglist[0]);
        msglist.slice(1).forEach(msg => {
            console.info(msg);
        });
        console.groupEnd();
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
        const config = {childList: true, subtree: true}

        const observer = new MutationObserver(() => {
            const content_text = document.querySelectorAll("#content-text");
            if ((content_text) && (content_text.length)) {
                content_text.forEach(block => {
                    // console.info(block);
                    block.querySelectorAll("a").forEach(function(value) {
                        let a_text = value.innerText;
                        if (isURL(a_text)) {
                            console.info("value:", value);
                            let _youtube = ["match:Youtube"];
                            _youtube.push("絶対ﾊﾟｽ：" + a_text);
                            value.classList.remove("yt-simple-endpoint");
                            value.style.textDecoration = "none";
                            value.setAttribute("href", a_text);
                            value.setAttribute("target", "_blank");
                            value.setAttribute("rel", "noopener noreferrer");
                            debug(_youtube);
                        }
                    });
                });
            }
        });
        observer.observe(target, config);
    }

    function others() {
        document.querySelectorAll("a").forEach(function(value) {
            let url_source_abs = value.href;
            let url_source_rel = value.getAttribute("href")
            //TODO: hrefの編集
            if (url_source_abs) {
                if (url_source_abs.match(/^https?:\/\/jump.(2|5)ch\.net\/\?.*/)) {
                    //* 2ちゃんねる
                    //* (jump.5ch.net/?http://example.com/example.html, jump.2ch.net/?,)
                    let _2ch = ["match:2ch.net", "絶対ﾊﾟｽ：" + url_source_abs];
                    value.setAttribute("href", fixPrefix(url_source_abs.replace(/^https?:\/\/jump.(2|5)ch\.net\/\?/, "")));
                    _2ch.push("変更後ﾊﾟｽ：" + value.href);
                    debug(_2ch);
                }
                // if (url_source_abs.match(/^https?:\/\/.+\.wiki\.fc2\.com\/jump\//)) {
                if (location.hostname.match(/^.+\.wiki\.fc2\.com/)) {
                    //* FC2 Wiki
                    //* (https://example.wiki.fc2.com/jump/https/example.com%2exapmple)
                    let _fc2 = ["match:FC2 Wiki", "絶対ﾊﾟｽ：" + url_source_abs, "相対ﾊﾟｽ：" + url_source_rel];
                    if (url_source_rel.match(/^\/jump\/https?\/.*/)) {
                        value.setAttribute("href", decodeURIComponent(url_source_rel.replace(/^\/jump\/https?\//, http_https(url_source_abs) + "://")));
                        value.setAttribute("target", "_blank");
                        value.setAttribute("rel", "noopener noreferrer");
                        _fc2.push("変更後ﾊﾟｽ：" + value.href);
                        debug(_fc2);
                    }
                }
                if (url_source_abs.match(/^https?:\/\/kakaku\.com\/jump\/\?url=.*/)) {
                    //* 価格.com
                    //* (https://kakaku.com/jump/?url=https%3A%2F%2Fwww%2Eexample%2Ecom%2F)
                    let _kakaku = ["match:価格.com", "絶対ﾊﾟｽ：" + url_source_abs];
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https?:\/\/kakaku\.com\/jump\/\?url=/, "")));
                    _kakaku.push("変更後ﾊﾟｽ：" + value.href);
                    debug(_kakaku);
                }
                if (url_source_abs.match(/^https:\/\/steamcommunity\.com\/linkfilter\/\?url=/)) {
                    //* Steam
                    //* (https://steamcommunity.com/linkfilter/?url=https://example.com/)
                    let _steam = ["match:Steam", "絶対ﾊﾟｽ：" + url_source_abs];
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https:\/\/steamcommunity\.com\/linkfilter\/\?url=/, "")));
                    _steam.push("変更後ﾊﾟｽ：" + value.href);
                    debug(_steam);
                }
                if (url_source_abs.match(/^https:\/\/re\.wikiwiki\.jp\//)) {
                    //* Wikiwiki
                    //* (https://re.wikiwiki.jp/?http://example.com/)
                    let _wikiwiki = ["match:Wikiwiki", "絶対ﾊﾟｽ：" + url_source_abs];
                    value.setAttribute("href", decodeURIComponent(url_source_abs.replace(/^https:\/\/re\.wikiwiki\.jp\/\?/, "")));
                    value.setAttribute("target", "_blank");
                    value.setAttribute("rel", "noopener noreferrer");
                    _wikiwiki.push("変更後ﾊﾟｽ：" + value.href);
                    debug(_wikiwiki);
                }
            }
        });
    }

    if (location.host.match(/^www\.+youtube\.com/)) {
        youtube();
    } else {
        others();
    }

    console.log("===END UserscriptWorks/plsDirectJump===");
})();