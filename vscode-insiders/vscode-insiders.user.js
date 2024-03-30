// ==UserScript==
// @name            vscode-insiders
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2023.12.17.1308
// @description     Visual Studio Marketplaceのインストール用リンクをinsiders向けにする
// @author          PC-CNT
// @license         MIT
// @match           *://marketplace.visualstudio.com/*
// ==/UserScript==



(() => {
    const observer = new MutationObserver(() => {
        let a = document.querySelector(`a.install`)
        a.href = a.href.replace(/^vscode:/, "vscode-insiders:");
    });

    observer.observe(document.body, {childList: true, subtree: true});

})();
