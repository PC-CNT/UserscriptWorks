// ==UserScript==
// @name            メルカリの商品画像落とすやつ
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2025.01.28.2248
// @description     
// @author          PC-CNT
// @license         MIT
// @match           *://*.mercari.com/*
// @icon            https://web-jp-assets-v2.mercdn.net/_next/static/media/favicon-192.f25eb78a.jpg
// @grant           GM_registerMenuCommand
// @require         https://cdn.jsdelivr.net/npm/@zip.js/zip.js@2.7.54/dist/zip-full.min.js
// @require         https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js
// ==/UserScript==


(() => {
    "use strict";

    async function createzip(params) {
        // let parent_div = document.querySelector(`[data-testid="vertical-thumbnail-scroll"]`) | document.querySelector(`[data-testid="carousel"]`)
        let parent_div = document.querySelector(`[data-testid="vertical-thumbnail-scroll"]`);
        
        let zipWriter = new zip.ZipWriter(new zip.BlobWriter("application/zip"));

        for (let slide of parent_div.querySelectorAll(`div.slick-slide`)) await (
            zipWriter.add(slide.querySelector(`img`).src.match(/\/([^\/]+)(?:(\?|@)\w+)$/)[1], new zip.HttpReader(slide.querySelector(`img`).src))
        )
        // await Promise.all([
        //     parent_div.querySelectorAll(`div[class="slick-slide"]`).forEach(slide => {
        //         let filename = slide.querySelector(`img`).src.match(/\/([^\/]+)(?:\?\w+)$/)[1];
        //         zipWriter.add(filename, new zip.HttpReader(slide.querySelector(`img`).src));
        //     })
        // ]);
        return zipWriter.close();
    }

    GM_registerMenuCommand("zipでダウンロード", function() {
        createzip().then(function(blob) {
            // console.log(blob);
            let id = location.href.match(/^https?:\/\/(?:.+\.)?mercari\.com\/(?:item|shops\/product)\/([a-zA-Z0-9]+)/)[1];
            saveAs(blob, `${document.querySelector("h1").innerText}[${id}].zip`);
        });
    })
})();
