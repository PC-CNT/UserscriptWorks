// ==UserScript==
// @name            AliExpressの100円ショップで元の商品ページへのリンクを追加するだけ
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024.08.06.0303
// @description     
// @author          PC-CNT
// @license         MIT
// @match           *://*.aliexpress.com/*
// @icon            https://ae01.alicdn.com/images/eng/wholesale/icon/aliexpress.ico
// ==/UserScript==

(() => {
    "use strict";

    const section = document.querySelector(`section[id="content"]`)

    const options = {
        childList: true,
        subtree: true
    };

    const observer = new MutationObserver(() => {
        observer.disconnect();
        let items = section.querySelectorAll(`div[target="_blank"][href][id]:not(.link_added)`);
        items.forEach((item) => {
            let id = item.getAttribute("id");
            let item_link_div = document.createElement("div");
            item_link_div.innerHTML = `<a target="_blank" href="https://aliexpress.com/item/${id}.html">商品ページ（別タブ）</a>`
            item_link_div.style.textAlign = "center";
            item_link_div.style.fontSize = "1.1em";
            item_link_div.style.marginTop = "1em";
            item.parentElement.appendChild(item_link_div);
            item.classList.add("link_added");
        });
        observer.observe(section, options);
    });
    observer.observe(section, options);
})();
