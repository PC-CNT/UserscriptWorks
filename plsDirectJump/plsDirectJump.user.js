// ==UserScript==
// @name            plsDirectJump
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.1.5
// @description     This is a script (planned) to remove cushion pages such as 2ch.net and FC2 Wiki from <a href> so that you can jump directly to them.
// @description:ja  <a href>から2ch.netやFC2 Wikiなどのクッションページを削除して直接飛ぶようにするスクリプト（の予定）です。
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @include         *://*
// @include         https://www.youtube.com/watch?v=*
// @grant           none
// ==/UserScript==


( () => {
    console.log("===START UserscriptWorks/plsDirectJump===");
    function http_https(host) {
        if (host.match("https")) {
            return "https";
        } else {
            return "http";
        }
    }

    document.querySelectorAll("a").forEach(function(value) {
        url_source = value.getAttribute("href");
        // console.log(url_source);
        //TODO: hrefの編集
        if (url_source) {
            // console.log("<a href> found:" + url_source);
            if (url_source.match(/^https?:\/\/jump.(2|5)ch\.net\/\?.*/)) {
                //* 2ちゃんねる
                //* (jump.5ch.net/?http://example.com/example.html, jump.2ch.net/?,)
                // console.log("2ch-match:" + url_source);
                value.setAttribute("href", url_source.replace(/^https?:\/\/jump.(2|5)ch\.net\/\?/, ""));
                // url_replace(value, url_source, /^https?:\/\/jump.(2|5)ch\.net\/\?/, "");
                // console.log("URL changed:" + value.getAttribute("href"));
            }
            // if (url_source.match(/^https?:\/\/.+\.wiki\.fc2\.com\/jump\//)) {
            if (location.hostname.match(/^.+\.wiki\.fc2\.com/)) {
                //* FC2 Wiki
                //* (https://example.wiki.fc2.com/jump/https/example.com%2exapmple)
                if (url_source.match(/^\/jump\/https?\/.*/)) {
                    // console.log(decodeURIComponent(url_source.replace(/^\/jump\/https?\//, http_https(url_source) + "://")));
                    value.setAttribute("href", decodeURIComponent(url_source.replace(/^\/jump\/https?\//, http_https(url_source) + "://")));
                    value.setAttribute("target", "_blank");
                    value.setAttribute("rel", "noopener noreferrer");
                }
            }
        }

    });

    // if (location.hostname.match(/^www\.youtube\.com/)) {
        //* youtube
        //* https://www.youtube.com/redirect?q=https%3A%2F%2Fexample.com%2F

        // const observer_config = {
        //     childList: true,
        //     subtree: true
        // };

        // let id_comments = document.getElementById("comments");
        // let comment_section = document.getElementsByTagName("ytd-comment-thread-renderer")
        // console.log("DirectJump->Youtube")
        // let observer = new MutationObserver(function(mutations) {
        //     observer.disconnect();
        //     mutations.forEach( node => {
        //         console.log("MutationObserver: " + node.target.innerHTML);
        //         value.classList.remove("yt-simple-endpoint")
        //         value.setAttribute("href", value.textContent);
        //     });
        //     observer.observe(comment_section, observer_config);
        // });


        // if (document.getElementById("comments") != null) {
        // if (url_source == null) {
            // value.classList.remove("yt-simple-endpoint")
            // value.setAttribute("href", value.textContent);
        // }
        // }
        // observer.observe(comment_section, observer_config);
    //     window.addEventListener('DOMContentLoaded', function(e){
    //         console.log("DOMContentLoaded");
    //         const jsInitCheckTimer = setInterval(jsLoaded, 1000);
    //         function jsLoaded() {
    //             if (document.querySelector("#comments") != null) {
    //                 clearInterval(jsInitCheckTimer);
    //                 document.querySelectorAll("ytd-comment-thread-renderer").forEach(function(value) {
    //                     value.querySelectorAll("a").forEach(function(a_tag_main) {
    //                         // let a_tag_main = value.querySelector("a");
    //                         let url_source = a_tag_main.getAttribute("href")
    //                         if (!a_tag_main.getAttribute("href")) {
    //                             a_tag_main.setAttribute("href", url_source);
    //                             a_tag_main.setAttribute("target", "_blank");
    //                             a_tag_main.setAttribute("rel", "noopener noreferrer");
    //                             // console.log(url_source);
    //                         }
    //                     });
    //                 });
    //             }
    //         }
    //     });
    // }

    // console.log("test")
    console.log("===END UserscriptWorks/plsDirectJump===");
})();