// ==Userscript==
// @name          plsDirectJump!
// @namespace     https://github.com/PC-CNT/UserscriptWorks/
// @version       0.0.1
// @description   2ch.netやFC2 Wikiなどのサイト内リンクからクッションページを削除して直接飛ぶようにするスクリプトです。
// @auther        PC-CNT
// @updateURL     
// @match         https?:\/\/[A-Za-z0-9].*(2|5)ch\.net\/[A-Za-z0-9]




// ==/Userscript==




(function () {
    // Check if the page is a 2ch.net or 5ch.net page.
    if (location.hostname.match(/^(2|5)ch\.net$/)) {
        // Do something
    }
})();