// ==UserScript==
// @name            GitHub show all Assets
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         1.0
// @icon            https://github.com/fluidicon.png
// @description     "Show all xx assets"と最新以降のAssetsを自動で開くようにする
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/GitHub_show_all_Assets/GitHub_show_all_Assets.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/GitHub_show_all_Assets/GitHub_show_all_Assets.user.js
// @match           https://github.com/*/*/releases*
// ==/UserScript==


window.addEventListener("load", (_event) => {

    document.querySelectorAll(`button[class='js-release-asset-untruncate-btn btn-link']`).forEach((button) => {
        button.click();
    })


    document.querySelectorAll(`summary:not([class]):not([aria-label]):not([aria-haspopup])[role="button"]`).forEach((summary) => {
        if (!summary.closest(`details`).hasAttribute(`open`)) {
            summary.click();
        }
    })

})