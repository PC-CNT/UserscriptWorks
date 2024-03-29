// ==UserScript==
// @name            Reddit - リプ全表示
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         1.0
// @icon            http://www.google.com/s2/favicons?domain=reddit.com&sz=128
// @description     Redditの more replies を自動で押すだけ
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/Reddit_more_replies/Reddit_more_replies.user.js
// @match           *://*.reddit.com/r/*/comments/*
// ==/UserScript==


window.addEventListener("load", (_event) => {

    const sleep = ((ms) => {
        new Promise((resolve, reject) => {
            setTimeout(resolve, ms)
        })
    })


    async function callback(p) {
        // console.log(p);
        p.click();
        await sleep(1500);
    };

    const target = document.querySelector(`div[class="uI_hDmU5GSiudtABRz_37 "]`);
    const config = {attributes: true, childList: true, subtree: true};
    const observer = new MutationObserver(() => {
        document.querySelectorAll(`p[class="_2HYsucNpMdUpYlGBMviq8M _23013peWUhznY89KuYPZKv"]`).forEach((p) => {
            callback(p);
        })
    })

    observer.observe(target, config);

});
