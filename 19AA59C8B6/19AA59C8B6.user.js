// ==UserScript==
// @name            19AA59C8B6
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.1
// @description:ja  ＪＰＯためし読みサービス「tameshiyo.me」の画像ダウンローダー（仮）
// @author          PC-CNT
// @license         MIT
// @match           *://*.tameshiyo.me/*
// @grant           none
// @require         https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js
// ==/UserScript==

(() => {
    "use strict";

    // const zero_left = document.querySelector("#tb_zero_left");
    // const zero_right = document.querySelector("#tb_zero_right")
    // const left = document.querySelector("#tb_left")
    // const right = document.querySelector("#tb_right")
    const toolbar = document.querySelector("#toolbar");


    const swap = (arr) => {
        for (let i = 0; i < arr.length; i += 2) {
            if (i + 1 < arr.length) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        return arr;
    }

    let images = [];

    const image_donwload = () => {
        const zip = new JSZip();

        images.forEach((img, index) => {
            zip.file(`${index.toString().padStart(3, "0")}.${img.match(/^data:image\/(jpg|png)/)[1]}`, img.replace(/^data:image\/(jpg|png);base64,/, ""), {
                base64: true
            })
        })

        zip.generateAsync({
            type: "blob",
            compression: "DEFLATE"
        }).then((content) => {
            saveAs(content, `${document.title}.zip`);
        });
    };

    const tb_sep = document.querySelector(".tb_sep").cloneNode(true);
    toolbar.appendChild(tb_sep);

    const downloadElement = document.createElement("a");
    downloadElement.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><g><rect fill="none" height="24" width="24"/></g><g><path d="M18,15v3H6v-3H4v3c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2v-3H18z M17,11l-1.41-1.41L13,12.17V4h-2v8.17L8.41,9.59L7,11l5,5 L17,11z"/></g></svg>`;
    downloadElement.setAttribute("href", "#");
    downloadElement.addEventListener("click", () => {
        image_donwload();
    });
    toolbar.appendChild(downloadElement);


    const observer = new MutationObserver(() => {
        let pages;
        if (document.querySelector("#tb_zero_right")) {
            //* 右から左に読むタイプ……のはず 1->0->3->2
            pages = swap([...document.querySelectorAll(`[class="page_img"][src]`)]);
        } else {
            pages = [...document.querySelectorAll(`[class="page_img"][src]`)]
        }
        pages.forEach((page_img) => {
            if (!page_img.src.match(/^data:image\/(jpg|png);base64,/)) {
                return;
            }
            if (images.includes(page_img.src)) {
                return;
            }

            images.push(page_img.src);
            // console.log(images)
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });

})();
