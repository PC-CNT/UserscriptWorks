// ==UserScript==
// @name            fix_ichiba_link
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024.05.01.1542
// @description     ニコ百に残ってるニコニコ市場のリンクを修正するやつ
// @author          PC-CNT
// @license         MIT
// @match           *://dic.nicovideo.jp/*
// @icon            http://www.google.com/s2/favicons?domain=https://dic.nicovideo.jp&sz=128
// ==/UserScript==

(() => {
    "use strict";

    const observer = new MutationObserver(() => {
        observer.disconnect()
        const regex_amazon = /^https?:\/\/ext\.ichiba\.nicovideo\.jp\/thumb\/az([0-9a-zA-Z]{10})/
        const regex_animate = /^https?:\/\/ext\.ichiba\.nicovideo\.jp\/thumb\/an([0-9]+)/
        document.querySelectorAll("iframe[data-src]").forEach(iframe => {
            if (iframe.getAttribute("data-src").match(regex_amazon)) {
                let url = `https://amazon.jp/dp/${iframe.getAttribute("data-src").match(regex_amazon)[1]}`
                iframe.outerHTML = `<p><a href="${url}" target="_blank">${url}</a></p>`
            }
            if (iframe.getAttribute("data-src").match(regex_animate)) {
                let url = `https://www.animate-onlineshop.jp/products/detail.php?product_id=${iframe.getAttribute("data-src").match(regex_animate)[1]}`
                iframe.outerHTML = `<p><a href="${url}" target="_blank">${url}</a></p>`
            }
        })
        observer.observe(document.body, {
            childList: true,
            subtree: true
        })
    })

    observer.observe(document.body, {
        childList: true,
        subtree: true
    })
})()
