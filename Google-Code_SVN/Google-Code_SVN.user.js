// ==UserScript==
// @name            Google-Code_SVN
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2023.08.17
// @description:ja  Google Code Archiveでrepo.svndump.gzをダウンロードするボタンを追加する
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/Google-Code_SVN/Google-Code_SVN.user.js
// @match           *://code.google.com/*
// @grant           none
// ==/UserScript==


(() => {
    "use strict";

    let _url;

    const observer = new MutationObserver(() => {
        if (_url === location.href) {
            return;
        }
        const sb = document.querySelector(`a[id="gca-export-to-gh"]`);
        _url = location.href;
        if (sb) {
            observer.disconnect();
            const t = sb.cloneNode(true);
            t.removeAttribute("id");
            t.setAttribute("style", `float: right;`)
            t.href = `https://storage.googleapis.com/google-code-archive-source/v2/code.google.com/${location.href.match(/https?:\/\/code\.google\.com\/archive\/p\/([^\/]+)\//)[1]}/repo.svndump.gz`
            t.textContent = `Download repo.svndump.gz`;
            sb.parentNode.insertAdjacentElement("afterbegin", t);
            observer.observe(document, {childList: true, subtree: true})
        }
    })

    observer.observe(document, {childList: true, subtree: true})
})();
