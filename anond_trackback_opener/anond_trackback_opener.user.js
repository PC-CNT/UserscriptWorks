// ==UserScript==
// @name            増田 - トラバ自動展開
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2023.10.27
// @icon            http://www.google.com/s2/favicons?domain=anond.hatelabo.jp&sz=128
// @description     増田のトラバをすべて展開するだけ
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/anond_trackback_opener/anond_trackback_opener.user.js
// @match           *://anond.hatelabo.jp/*
// ==/UserScript==


window.addEventListener("load", (_event) => {
    document.querySelectorAll(`div[class="trackback-header"]`).forEach((div) => {
        div.querySelector(`a[onclick]`).click()
    })
})
