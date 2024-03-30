// ==UserScript==
// @name            controlc.com Downloader
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024.01.29.08.07
// @description     controlc.comのテキストをtxtで落とすだけ
// @author          PC-CNT
// @license         MIT
// @match           *://controlc.com/*
// @icon            http://www.google.com/s2/favicons?domain=controlc.com&sz=128
// @grant           GM_registerMenuCommand
// ==/UserScript==


GM_registerMenuCommand("Download", function() {
    const f = document.querySelector(`#pasteFrame`).contentWindow.document;

    const blob = new Blob([f.querySelector(`#thepaste`).textContent], { type: 'text/plain' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = document.title.replace(/^\w+ - /, "");
    a.click();
    URL.revokeObjectURL(a.href);
})
