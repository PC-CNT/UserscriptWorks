// ==UserScript==
// @name            youtube_no_mix
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2025.06.24.1833
// @description     
// @author          PC-CNT
// @license         MIT
// @match           *://*.youtube.com/*
// @icon            
// @grant           
// @require         
// ==/UserScript==

(() => {
    "user strict";

    const _r = /^https?:\/\/(www\.)?youtube\.com\/watch\?v=.+(&start_radio=1|&list=RD\w+)(.+)?/

    const options = {
        childList: true,
        subtree: true
    };

    const observer = new MutationObserver((mutations) => {
        observer.disconnect();
        if (location.href.match(_r)) {
            location.href = location.href.replace(/&start_radio=1/, "").replace(/&list=RD\w+/, "");
        }

        document.querySelectorAll(`a`).forEach((a) => {
            if (a.href.match(_r)) {
                a.href = a.href.replace(/&start_radio=1/, "").replace(/&list=RD\w+/, "");
            }
        })
        observer.observe(document.body, options);
    });

    observer.observe(document.body, options);

})();
