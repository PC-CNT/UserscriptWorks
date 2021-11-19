// ==UserScript==
// @name            plsDirectJump
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.2
// @description:ja  2ch.netやFC2 Wikiなどのサイト内リンクからクッションページを削除して直接飛ぶようにするスクリプト（の予定）です。
// @auther          PC-CNT
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.js
// @include         /^https?:\/\/*
// @grant           none
// ==/UserScript==




(function () {
    console.log("===START UserscriptWorks/plsDirectJump===");
    // if (location.hostname.match(/^(2|5)ch\.net$/)) {
    //     // Do something
    //     let class_thread = document.getElementsByClassName("thread");
    //     class_thread.querySelectorAll("a").forEach(function(value) {
    //         url_source = value.getAttribute("href");
    //         console.log(url_source);

    //     });
    // }
    // let class_thread = document.getElementsByClassName("thread");
    // class_thread.querySelectorAll("a").forEach(function(value) {
    document.querySelectorAll("a").forEach(function(value) {
        url_source = value.getAttribute("href");
        // console.log(url_source);
        //TODO: hrefの編集
        //* 2ちゃんねる (jump.5ch.net/?http://example.com/example.html, jump.2ch.net/?,)
        //* FC2 Wiki (https://example.wiki.fc2.com/jump/https/example.com%2exapmple)
        if (url_source.match(/^https?:\/\/jump.(2|5)ch\.net\/\?.*/)) {
            console.log("match:" + url_source);
            value.setAttribute("href", url_source.replace(/^https?:\/\/jump.(2|5)ch\.net\/\?/, ""));
        }
    });
    // console.log("test")
    console.log("===END UserscriptWorks/plsDirectJump===");
})();