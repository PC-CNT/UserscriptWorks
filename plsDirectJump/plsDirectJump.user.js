// ==Userscript==
// @name          plsDirectJump!
// @namespace     https://github.com/PC-CNT/UserscriptWorks/
// @version       0.0.1
// @description   2ch.netやFC2 Wikiなどのサイト内リンクからクッションページを削除して直接飛ぶようにするスクリプトです。
// @auther        PC-CNT
// @updateURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/plsDirectJump/plsDirectJump.js
// @match         /^https?:\/\/*
// @grant         none
// ==/Userscript==




(function () {
    if (location.hostname.match(/^(2|5)ch\.net$/)) {
        // Do something
        let class_thread = document.getElementsByClassName("thread");
        class_thread.querySelectorAll("a").forEach(function(value) {
            console.log(value.getAttribute("href"));
        });
    }
})();