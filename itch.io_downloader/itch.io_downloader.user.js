// ==UserScript==
// @name            itch.io downloader
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2023.09.25.0420
// @description:ja  itch.ioのページ上にあるDownloadボタンを自動でクリックするだけ
// @author          PC-CNT
// @license         MIT
// @match           *://*.itch.io/*
// @grant           GM_registerMenuCommand
// ==/UserScript==


(() => {
    "use strict";

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function download() {
        for(let a of document.querySelector(`#download`).nextElementSibling.querySelectorAll(`a`)) {
            a.click();
            await sleep(5000);
        }
    }

    GM_registerMenuCommand("Download", function () {
        download();
    })
})();
