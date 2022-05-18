// ==UserScript==
// @name            back to GeoCities
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.4
// @description     Yahoo! ジオシティーズへのリンクをすべて魚拓（archive.org）のリンクに書き換えます
// @author          PC-CNT
// @license         MIT
// @downloadURL     
// @updateURL       
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @match           *://*
// @grant           none
// ==/UserScript==

(function() {
    // http://www.geocities.jp/example/
    console.log("===START UserscriptWorks/Back2GeoCities===");
    document.querySelectorAll("a").forEach(function (a_tag) {
        if (a_tag.href.match(/^https?:\/\/.*\.geocities\.(co\.jp|jp|com)\/.*/)) {
            console.log("match: " + a_tag.href);
            a_tag.setAttribute("href", "https://web.archive.org/web/0/" + a_tag.href);
            a_tag.setAttribute("target", "_blank");
            a_tag.setAttribute("rel", "noopener noreferrer");
        }
    });
    console.log("===END UserscriptWorks/Back2GeoCities===");
})();