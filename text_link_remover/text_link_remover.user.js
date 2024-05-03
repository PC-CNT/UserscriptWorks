// ==UserScript==
// @name            text_link_remover
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024.05.03.1429
// @description     Text fragmentsのリンク消すだけ
// @author          PC-CNT
// @license         MIT
// @match           *://*/*
// ==/UserScript==


(() => {
    "use strict";

    document.querySelectorAll("a").forEach(a => {
        if (a.href.match(/^(https?:\/\/.+)#:~:text=.+/)) {
            a.href = a.href.replace(/^(https?:\/\/.+)#:~:text=.+/, "$1");
        }
    })
})()
