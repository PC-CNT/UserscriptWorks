// ==UserScript==
// @name            Search engine to KZ BRAIN Mobile
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.6
// @author          PC-CNT
// @license         MIT
// @description:ja  検索エンジンの結果からKZ BRAIN Mobileの軽量サイトを別タブで直接開くようにするスクリプトです。
// @downloadURL     https://github.com/PC-CNT/UserscriptWorks/raw/main/searchengine2KZ_BRAIN_Mobile/searchengine2KZ_BRAIN_Mobile.user.js
// @updateURL       https://github.com/PC-CNT/UserscriptWorks/raw/main/searchengine2KZ_BRAIN_Mobile/searchengine2KZ_BRAIN_Mobile.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @include         http*://www.google.com/search?*
// @grant           none
// ==/UserScript==

(function () {
    console.log("===START UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
    const KZ_url = "http://servermobile.net/index.php?_kzm_u=";

    let div_id_search = document.getElementById("search");
    div_id_search.querySelectorAll(".g").forEach(function(value) {
        let a_tag_main = value.querySelector("a");
        let url_source = a_tag_main.getAttribute("href");
        a_tag_main.setAttribute("href", KZ_url + url_source);
        a_tag_main.setAttribute("target", "_blank");
        a_tag_main.setAttribute("rel", "noopener noreferrer");
        // console.log(url_source);
        // 検索結果の数だけ繰り返す
    });
    console.log("===END UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
})();