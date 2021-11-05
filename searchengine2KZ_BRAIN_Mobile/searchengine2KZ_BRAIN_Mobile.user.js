// ==UserScript==
// @name         Search engine to KZ BRAIN Mobile
// @version      0.0.1
// @description  検索エンジンの結果から直接KZ BRAIN Mobileの軽量サイトに直接移動できるスクリプトです。
// @author       PC-CNT
// @include        /^(http|https):\/\/www\.google\..+\/search.*/
// @grant        none
// ==/UserScript==

window.onload = function(){
    const KZ_url = "http://servermobile.net/index.php?_kzm_u=";

    let div_id_search = document.getElementById("search");
    div_id_search.querySelectorAll(".g").forEach(function(value) {
        let a_tag_main = value.querySelector("a");
        // console.log(a_tag_main);
        let url_source = a_tag_main.getAttribute("href");
        a_tag_main.setAttribute("href", KZ_url + url_source);
        // console.log(url_source);
        // console.log("test");
        // 検索結果の数だけ繰り返す
    });
}
