// ==UserScript==
// @name            スラド - 米欄自動展開
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2022.12.22.0753
// @icon            http://www.google.com/s2/favicons?domain=srad.jp&sz=128
// @description     スラドのコメント欄をすべて展開するだけ
// @author          PC-CNT
// @license         MIT
// @match           *://*.srad.jp/*
// ==/UserScript==




window.addEventListener("load", (_event) => {
    const _x = window.scrollX;
    const _y = window.scrollY;
    document.querySelectorAll(`.commentBody.comment-body`).forEach((c) => {
        c.click();
    });
    window.scrollTo(_x, _y);
})
