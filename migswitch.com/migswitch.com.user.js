// ==UserScript==
// @name            I agree Migswitch.com
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024-03-29
// @description     
// @author          PC-CNT
// @license         MIT
// @match           *://migswitch.com/*
// @icon            http://www.google.com/s2/favicons?domain=https://migswitch.com/&sz=128
// ==/UserScript==

window.addEventListener('load', () => {
    if (document.querySelector(`label[for="acceptTOS"]`)) {
        if (!document.querySelector(`input[type=checkbox][class="mr-3"]`).checked) {
            document.querySelector(`input[type=checkbox][class="mr-3"]`).click();
        }
        document.querySelector(`button`).click();
    }
});
