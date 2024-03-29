// ==UserScript==
// @name            fix acg.tv link
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2023.09.14
// @author          PC-CNT
// @license         MIT
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
