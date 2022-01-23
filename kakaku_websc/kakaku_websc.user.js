// ==UserScript==
// @name            kakaku_websc
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.1
// @description:ja  価格.comの商品名を全部コピーします。改行を含めたくなかったら20行目の + "\n" を削除してください。
// @author          PC-CNT
// @license         MIT
// @downloadURL     https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/kakaku_websc/kakaku_websc.user.js
// @updateURL       https://raw.githubusercontent.com/PC-CNT/UserscriptWorks/main/kakaku_websc/kakaku_websc.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @include         *://kakaku.com/*/itemlist.aspx*
// @grant           none
// ==/UserScript==



( () => {
    _result = [];
    document.querySelectorAll(".ckitemLink").forEach(function(value) {
        _result += (value.innerText + "\n");
    });
    navigator.clipboard.writeText(_result).then(() => {
        console.log("Copied to clipboard");
    }, () => {
        console.log("Failed to copy to clipboard");
    });
})();
