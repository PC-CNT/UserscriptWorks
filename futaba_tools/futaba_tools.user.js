// ==UserScript==
// @name            futaba_tools
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.2
// @description:ja  某掲示板用
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/futaba_tools/futaba_tools.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/futaba_tools/futaba_tools.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @match           *://*.2chan.net/*
// @grant           none
// @require         https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/encoding-japanese/2.0.0/encoding.min.js
// ==/UserScript==


( () => {
    `use strict`;

    const download_button = document.createElement("button");
    download_button.innerText = "Download!";
    download_button.classList.add("__t002");
    download_button.style.cssText = `
    position:fixed;
    bottom:10vh;
    right:0;
    z-index:9999;
    width:100px;
    height:40px;
    `;
    download_button.addEventListener("click", () => {

        const zip = new JSZip();

        // let all_html = document.querySelector(`html`).outerHTML;
        let all_html = document.importNode(document.querySelector(`html`), true);

        //* 下準備
        all_html.querySelector(`form > input`).parentNode.remove();

        all_html.querySelector(`meta[http-equiv="Content-Type"]`).setAttribute("content", "text/html; charset=utf-8");

        all_html.querySelector(`button[class="__t002"]`).remove();

        all_html.querySelector(`div > div[id="rightad"]`).parentNode.remove();

        all_html.querySelector(`div[class="tue"]`).remove();

        all_html.querySelectorAll(`div > iframe[src]`).forEach(iframe => {
            iframe.remove();
        });

        // all_html.querySelector(`span[id="contres"]`).remove()

        all_html.querySelectorAll(`a`).forEach(a => {
            if (a.getAttribute("href").match(/^\/bin\/jump\.php\?/)) {
                a.setAttribute("href", a.getAttribute("href").replace(/^\/bin\/jump\.php\?/, ""));
            }
        });

        //* 下準備終了

        zip.file(`css/style.css`, JSZipUtils.getBinaryContent(document.querySelector(`link[rel="stylesheet"]`).href));
        all_html.querySelector(`link[rel="stylesheet"]`).setAttribute("href", "css/style.css");

        all_html.querySelectorAll(`a`).forEach(a_tag => {
            if (a_tag.href.replace(/^.*\/(.*)$/, "$1") === a_tag.textContent) {
                a_tag.setAttribute("href", `img/${a_tag.textContent}`);
            }
        });


        all_html.querySelectorAll(`a > img`).forEach( (img_tag) => {
            const a_img_tag = img_tag.parentNode;
            const img_trail = a_img_tag.href.replace(/^.*\/(.*)$/, "$1");
            const img_thumb = img_tag.src.replace(/^.*\/(.*)$/, "$1");

            zip.file(`img/${img_trail}`, JSZipUtils.getBinaryContent(a_img_tag.href, {binary: true}));
            zip.file(`thumb/${img_thumb}`, JSZipUtils.getBinaryContent(img_tag.src, {binary: true}));

            a_img_tag.setAttribute("href", `img/${img_trail}`);
            img_tag.setAttribute("src", `thumb/${img_thumb}`);
            console.log(a_img_tag);
        });


        console.log(all_html);

        zip.file("index.html", all_html.outerHTML);

        zip.file(`${document.title}.url`, `[InternetShortcut]\nURL=${location.href}`);

        zip.generateAsync({type:"blob", compression: 'DEFLATE'}).then(blob => {
            saveAs(blob, `${document.querySelectorAll(`span[class="cnw"]`)[0].innerText.match(/(\d{2}\/\d{2}\/\d{2})/gm)[0].replaceAll("/", "")}_${document.querySelectorAll(`span[class="cno"]`)[0].innerText.replace(/^(No\.)/, "")}_${document.title.replaceAll(` `,`_`)}.zip`);
        });


    });

    if (location.href.match(/https?:\/\/.+\.2chan\.net\/\w+\/res\/\d+\.html?/)) {
        document.body.appendChild(download_button);
    }


})();