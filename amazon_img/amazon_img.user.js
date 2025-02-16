// ==UserScript==
// @name            Amazonの商品画像落とすやつ
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2025.02.06.0152
// @description     
// @author          PC-CNT
// @license         MIT
// @match           *://*.amazon.com/*
// @match           *://*.amazon.co.jp/*
// @icon            http://www.google.com/s2/favicons?domain=https://www.amazon.com&sz=128
// @grant           GM_registerMenuCommand
// @require         https://cdn.jsdelivr.net/npm/@zip.js/zip.js@2.7.54/dist/zip-full.min.js
// @require         https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// ==/UserScript==

(() => {
    "use strict";

    async function createzip() {
        let zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"));

        document.querySelector(`#altImages`).querySelector(`ul`).querySelectorAll(`li.imageThumbnail`).forEach((li) => {
            li.click();
        });

        // for (let block of document.querySelectorAll(`[data-csa-c-action="image-block-main-image-hover"]`)) {
        for (let item of document.querySelector("#main-image-container > ul").querySelectorAll(`li.item`)) {
            let img_match = item.querySelector(`img`).src.match(/https?:\/\/m\.media-amazon\.com\/images\/I\/(\w+)(?:\.\w+)?(\.\w+)/)
            if (!img_match) return;
            let img_url = `https://m.media-amazon.com/images/I/${img_match[1]}${img_match[2]}`
            let img_filename = `${img_match[1]}${img_match[2]}`
            // console.log(`${img_url}:${img_filename}`);
            await (
                zipWriter.add(img_filename, new zip.HttpReader(img_url))
            )
        }
        return zipWriter.close();
    }

    GM_registerMenuCommand("zipでダウンロード", function() {
        createzip().then(function(blob) {
            // console.log(blob);
            let id = location.href.match(/^https?:\/\/(?:www\.)?amazon\.(?:com|co\.jp)\/(?:.+\/)?(?:dp\/)?([a-zA-Z0-9]+)/)[1];
            saveAs(blob, `${document.querySelector(`h1[id="title"]`).innerText.trim()}[${id}].zip`);
        });
    })
})();
