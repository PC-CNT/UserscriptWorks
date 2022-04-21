// ==UserScript==
// @name            積読
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.7
// @description:ja  てきとう
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/4B55061D9/4B55061D9.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/4B55061D9/4B55061D9.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @include         https://viewer.impress.co.jp/*
// @grant           none
// @require         https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip/3.7.1/jszip.min.js
// @require         https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.min.js
// ==/UserScript==


( () => {
    console.log("===START UserscriptWorks/4B55061D9/====");

    let zip = new JSZip();


    


    const observer = new MutationObserver(() => {
        //
        let div_slide = document.querySelector(`div[aria-hidden='false']`);

        console.log(div_slide);
    
        let images = div_slide.querySelectorAll(`img:not([class="viewer_spacer"])`);

        images.forEach((image, index) => {
            // zip.file(`${location.search.match(/^.+&page=(.+)/)[1]}_${index}.jpg`, image.src.split(",")[1], {base64: true});
            // zip.file(`${div_slide.getAttribute("data-slick-index")* 2 + index}.jpg`, image.src.split(",")[1], {base64: true});
            zip.file(`${Number(location.search.match(/^.+&page=(.+)/)[1]) + index}.jpg`, image.src.split(",")[1], {base64: true});
        });

        // document.querySelector(`span[class="controll page_right"]`).click();

    });


    const export_zip = () => {
        zip.generateAsync({type: "blob", compression: "DEFLATE"}).then( (content) => {
            let D = new Date();
            saveAs(content, `${D.getFullYear()}-${D.getMonth() + 1}-${D.getDate()}_${D.getHours()}-${D.getMinutes()}-${D.getSeconds()}.zip`);
        });
    };




    const add_download_button = () => {
        let button = document.createElement("button");
        button.innerText = "download";
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
            // const config_slide = {childlist: true, subtree: true};
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