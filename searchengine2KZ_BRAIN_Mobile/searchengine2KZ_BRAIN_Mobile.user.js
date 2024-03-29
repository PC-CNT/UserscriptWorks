// ==UserScript==
// @name            Search engine to KZ BRAIN Mobile
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.1.1
// @author          PC-CNT
// @license         MIT
// @description:ja  検索エンジンの結果からKZ BRAIN Mobileの軽量サイトを別タブで直接開くようにするスクリプトです。
// @downloadURL     https://github.com/PC-CNT/UserscriptWorks/raw/main/searchengine2KZ_BRAIN_Mobile/searchengine2KZ_BRAIN_Mobile.user.js
// @match           *://*/*
// @grant           none
// ==/UserScript==

(function() {
    console.log("===START UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
    const KZ_url = "http://servermobile.net/index.php?_kzm_u=";


    if (location.href.match(/^https:\/\/www\.google\..+\/search\?.+/)) {
        //* Google.com

        document.querySelector("#search").querySelectorAll(".g").forEach(function(block) {
            //? `[data-sokoban-container]`
            block.querySelectorAll(`.yuRUbf`).forEach((c) => {
                let link = c.querySelector(`a`).href;
                let tab_html = document.createElement("div");
                tab_html.innerHTML = `<a href="${KZ_url}${link}" target="_blank">KZ BRAIN Mobile</a>`
                c.insertAdjacentElement("beforeend", tab_html);
            })
        });
    }

    console.log("===END UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
})();
