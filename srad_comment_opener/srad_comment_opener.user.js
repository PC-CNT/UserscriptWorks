// ==UserScript==
// @name            スラド - 米欄自動展開
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         1.0
// @icon            http://www.google.com/s2/favicons?domain=srad.jp&sz=128
// @description     スラドのコメント欄をすべて展開するだけ
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/srad_comment_opener/srad_comment_opener.user.js
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
