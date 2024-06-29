// ==UserScript==
// @name            feedly close confirm
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024.06.13.1403
// @description     nnkr
// @author          PC-CNT
// @license         MIT
// @match           *://feedly.com/*
// @icon            http://www.google.com/s2/favicons?domain=https://feedly.com&sz=128
// ==/UserScript==


(() => {
    window.addEventListener("beforeunload", (e) =>{
        e.preventDefault()
    })
})()
