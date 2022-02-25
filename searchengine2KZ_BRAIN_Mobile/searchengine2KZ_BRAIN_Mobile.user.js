// ==UserScript==
// @name            Search engine to KZ BRAIN Mobile
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         0.0.8
// @author          PC-CNT
// @license         MIT
// @description     This script allows you to open the KZ BRAIN Mobile lightweight site directly from search engine results in a separate tab.
// @description:ja  検索エンジンの結果からKZ BRAIN Mobileの軽量サイトを別タブで直接開くようにするスクリプトです。
// @downloadURL     https://github.com/PC-CNT/UserscriptWorks/raw/main/searchengine2KZ_BRAIN_Mobile/searchengine2KZ_BRAIN_Mobile.user.js
// @updateURL       https://github.com/PC-CNT/UserscriptWorks/raw/main/searchengine2KZ_BRAIN_Mobile/searchengine2KZ_BRAIN_Mobile.user.js
// @supportURL      https://github.com/PC-CNT/UserscriptWorks/issues
// @include         http*://www.google.com/search?*
// @include         http*://duckduckgo.com/?q=*
// @grant           none
// ==/UserScript==

(function () {
    console.log("===START UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
    const KZ_url = "http://servermobile.net/index.php?_kzm_u=";

    function addKZurl(url) {
        return KZ_url + url;
    }

    if (location.hostname.match("www.google.com")) {
        let div_id_search = document.getElementById("search");
        div_id_search.querySelectorAll(".g").forEach(function(value) {
            value.querySelectorAll("a").forEach(function(a_tag_main) {
                // let a_tag_main = value.querySelector("a");
                let url_source = a_tag_main.getAttribute("href");
                a_tag_main.setAttribute("href", KZ_url + url_source);
                a_tag_main.setAttribute("target", "_blank");
                a_tag_main.setAttribute("rel", "noopener noreferrer");
                // console.log(url_source);
                // 検索結果の数だけ繰り返す
            });
        });
    }
    if (location.hostname.match("duckduckgo.com")) {
        console.log("duckduckgo.com");
        let div_id_links = document.getElementById("links");
        div_id_links.querySelectorAll(".results_links_deep").forEach(function(value) {
            console.log(value);
            value.querySelectorAll("a").forEach(function(a_tag) {
                console.log(value.getAttribute("href"));
                let url_source = value.getAttribute("href");
                value.classList.remove("js-result-extras-url");
                value.setAttribute("href", KZ_url + url_source);
                value.setAttribute("target", "_blank");
                value.setAttribute("rel", "noopener noreferrer");
            });
        });
        console.log("duck工事中…");
    }
    console.log("===END UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
})();