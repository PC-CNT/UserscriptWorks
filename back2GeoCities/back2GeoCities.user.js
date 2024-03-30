// ==UserScript==
// @name            back to GeoCities
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2021.11.29.2327
// @description     Yahoo! ジオシティーズへのリンクをすべて魚拓（archive.org）のリンクに書き換えます
// @author          PC-CNT
// @license         MIT
// @match           *://*/*
// @grant           none
// ==/UserScript==

(function() {
    document.querySelectorAll("a").forEach(function (a_tag) {
        if (a_tag.href.match(/^https?:\/\/www\.geocities\.(co\.jp|jp|com)\/.*/i)) {
            console.log("match: " + a_tag.href);
            a_tag.setAttribute("href", "https://web.archive.org/web/0/" + a_tag.href);
            a_tag.setAttribute("target", "_blank");
            a_tag.setAttribute("rel", "noopener noreferrer");
        }
    });
})();
