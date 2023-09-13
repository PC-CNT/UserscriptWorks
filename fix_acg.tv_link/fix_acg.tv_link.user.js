// ==UserScript==
// @name            fix acg.tv link
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2023.09.14
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/fix_acg.tv_link/fix_acg.tv_link.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/fix_acg.tv_link/fix_acg.tv_link.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @match           *://*.bilibili.com/*
// @grant           none
// ==/UserScript==


(() => {
    "use strict";

    let _url;

    const observer = new MutationObserver(() => {
        if (_url === location.href) {
            return;
        }
        _url = location.href;
        observer.disconnect();
        document.querySelectorAll(`a`).forEach((a) => {
            if (a.href.match(/^https?:\/\/(www\.)?acg\.tv/)) {
                a.href = a.href.replace(/(www\.)?acg\.tv/, "nico.ms");
                // console.log(a.href);
            }
        })
        observer.observe(document, {childList: true, subtree: true})
    })

    observer.observe(document, {childList: true, subtree: true})
})();