// ==UserScript==
// @name            Redditの翻訳を無効化するだけ
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2025.06.03.0216
// @description     
// @author          PC-CNT
// @license         MIT
// @match           *://*/*
// @icon            https://www.google.com/s2/favicons?domain=reddit.com&sz=128
// ==/UserScript==

(() => {
    "use strict";

    const r = /https:\/\/\w+\.reddit\.com\/r\/\w+\/(comments\/\w+(\/.+)\/)?\?tl=\w+/

    document.querySelectorAll("a").forEach(a => {
        if (a.href.match(r)) {
            a.href = a.href.replace(/\?tl=\w+/, "");
        }
    })

    if (location.href.match(r)) {
        location.href = location.href.replace(/\?tl=\w+/, "")
    }
})()
