// ==UserScript==
// @name            Rentry.co export to download
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2023-12-27
// @description     rentry.co（or rentry.co）の各exportボタンで直接ファイルを落とせるようにするだけ
// @author          PC-CNT
// @license         MIT
// @match           *://rentry.co/*
// @match           *://rentry.org/*
// @icon            http://www.google.com/s2/favicons?domain=https://rentry.co&sz=48
// ==/UserScript==

(() => {
    document.querySelector(`.dropdown-content`).querySelectorAll(`a`).forEach((a) =>{
        a.setAttribute("download", "");
    })
})();