// ==UserScript==
// @name            積読
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2022.03.11.2053
// @description:ja  てきとう
// @author          PC-CNT
// @license         MIT
// @match           *://viewer.impress.co.jp/*
// @require         https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js
// ==/UserScript==


( () => {
    console.log("===START UserscriptWorks/4B55061D9/====");

    const zip = new JSZip();


    //? Uncaught RangeError: Maximum call stack size exceeded
    //? とりあえず保留
    const scroll_image = () => {
        // let _page = document.querySelector(`input[id="ipc_viewer_page_input"] > div`).innerText;
        const _page = window.location.href.match(/^.+page=(\d+).*/)[1];

        if (_page === document.querySelector(`input[id="ipc_viewer_page_input"]`).nextElementSibling.innerText.match(/^\D+(\d+)/)[1]) {
            export_zip();
            return;
        }

        const images = document.querySelectorAll(`div[aria-hidden="false"] > img:not([class="viewer_spacer"])`);
        images.forEach((image, index) => {
            zip.file(`${Number(location.search.match(/^.+&page=(.+)/)[1]) + index}.jpg`, image.src.split(",")[1], {base64: true});
        });

        setTimeout(() => { document.querySelector(`li[class="next_page"]`).click(); }, 2000);
        // if (_page !== window.location.href.match(/^.+page=(\d+).*/)[1]) {
        //      scroll_image()
        // } else {
        //     return;
        // }
    
    }


    const test = () => {
        //* 最初のページに移動
        document.querySelector(`li[class="first_page"]`).click();
        //* 画像を取得
        // scroll_image();
        //* ダウンロード
        // export_zip();
    }


    const observer = new MutationObserver(() => {
        //
        const div_slide = document.querySelector(`div[aria-hidden='false']`);

        console.log(div_slide);
    
        // let images = div_slide.querySelectorAll(`img:not([class="viewer_spacer"])`);

        // images.forEach((image, index) => {
        //     // zip.file(`${location.search.match(/^.+&page=(.+)/)[1]}_${index}.jpg`, image.src.split(",")[1], {base64: true});
        //     // zip.file(`${div_slide.getAttribute("data-slick-index")* 2 + index}.jpg`, image.src.split(",")[1], {base64: true});
        //     zip.file(`${Number(location.search.match(/^.+&page=(.+)/)[1]) + index}.jpg`, image.src.split(",")[1], {base64: true});
        // });

        // setTimeout(() => { document.querySelector(`span[class="controll page_right"]`).click(); }, 1000);

    });


    const export_zip = () => {
        const slides = document.querySelector(`div[class="slick-track"]`).childNodes;
        slides.forEach((slide, slide_index) => {
            const images = slide.querySelectorAll(`img:not([class="viewer_spacer"])`);
            images.forEach((image, image_index) => {
                let filename = ``;
                if ((slide_index * 2 + image_index) == 0) {
                    filename = `1`;
                } else {
                    filename = `${slide_index * 2 + image_index}`;
                }
                zip.file(`${filename.padStart(3, "0")}.jpg`, image.src.split(",")[1], {base64: true});
            });
        });



        zip.generateAsync({type: "blob", compression: "DEFLATE"}).then( (content) => {
            const D = new Date();
            // saveAs(content, `${D.getFullYear()}-${D.getMonth() + 1}-${D.getDate()}_${D.getHours()}-${D.getMinutes()}-${D.getSeconds()}.zip`);
            // saveAs(content, `${(decodeURI(document.querySelector(`li[class="twitter"] > a`).href)).match(/^.*『(.+)』.*/)[1]}.zip`);
            saveAs(content, `${(document.querySelector(`div[id="ipc_viewer_navigation"] > h2`).innerText.match(/^.*『(.+)』.*/)[1])}.zip`);
        });
    };




    const add_download_button = () => {
        const button = document.createElement("button");
        button.innerText = "Download!";
        button.addEventListener("click", export_zip);
        document.querySelector("ul[class='controll']").appendChild(button);
    };


    const __target = document.body;
    const __config = {childlist: true, subtree: true, attributes: true,};
    const __observer = new MutationObserver( (mutations) => {
        if (document.querySelector("div[class='slick-track']")) {
            console.log(document.querySelector("div[class='slick-track']").childNodes)
            __observer.disconnect();
            add_download_button();
            const target_slide = document.querySelector("div[class='slick-track']");
            console.log(target_slide);
            observer.observe(target_slide, {childList: true, subtree: true});
        }
    });
    __observer.observe(__target, __config);









    // let download_button = document.createElement("li");
    // // download_button.style.position = "fixed";
    // // download_button.style.right = "10px";
    // // download_button.style.bottom = "10px";
    // // download_button.style.zIndex = "9999";
    // download_button.style.addEventListener("click", export_zip);

    // document.querySelector(`ul[class="controll"]`).appendChild(download_button);


})();
