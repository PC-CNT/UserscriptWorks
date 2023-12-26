// ==UserScript==
// @name            いつものろーだー03
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.1
// @description:ja  てきとう
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/3559027CF/3559027CF.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/3559027CF/3559027CF.user.js
// @match           https://web-ace.jp/*
// @grant           none
// @require         https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js
// ==/UserScript==


/*
（スクロール処理どうしよう……）
*/ 


(function() {
    "use strict";


    const zip = new JSZip();


    const save_zip = () => {
        const images = document.querySelectorAll(`img[class="lazy viewerFixedImage"]`)
        images.forEach((image, index) => {
            zip.file(`${(index+1).toString().padStart(3, "0")}.jpg`, JSZipUtils.getBinaryContent(image.src, {binary: true}));
        });

        console.log(images.length);

        zip.generateAsync({type: "blob", compression: "DEFLATE"}).then( (content) => {
            saveAs(content, `${document.title.match(/^(.+)｜.+/)[1]}.zip`);
        });
    }

    const add_button = () => {
        const button = document.createElement("button");
        button.innerText = "Download!";
        button.style = "font-size: 2em";
        button.addEventListener("click", save_zip);
        document.querySelector("#viewerPc > div.viewerbtn").after(button);
    }


    const target = document.body;
    const config = {childList: true, subtree: true, attributes: true};
    const observer = new MutationObserver(() => {
        if (document.querySelector(`.lazy-container`)) {
            observer.disconnect();
            add_button();
            // console.log("てす")
        }
    })

    observer.observe(target, config);
})();