// ==UserScript==
// @name         Search engine to KZ BRAIN Mobile
// @version      0.0.3
// @description  検索エンジンの結果から直接KZ BRAIN Mobileの軽量サイトに直接移動できるスクリプトです。
// @author       PC-CNT
// @include        /^(http|https):\/\/www\.google\..+\/search.*/
// @grant        none
// ==/UserScript==

document.addEventListener('DOMContentLoaded', function() {
    console.log("===START UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
    const KZ_url = "http://servermobile.net/index.php?_kzm_u=";

    let div_id_search = document.getElementById("search");
    div_id_search.querySelectorAll(".g").forEach(function(value) {
        let a_tag_main = value.querySelector("a");
        let url_source = a_tag_main.getAttribute("href");
        a_tag_main.setAttribute("href", KZ_url + url_source);
        // console.log(url_source);
        // 検索結果の数だけ繰り返す
    });
    console.log("===END UserscriptWorks/searchengine2KZ_BRAIN_Mobile===");
});