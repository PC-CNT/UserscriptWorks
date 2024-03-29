// ==UserScript==
// @name            d/ヒ/ッ/ツ/のやつ
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024-03-29-2350
// @author          PC-CNT
// @license         MIT
// @match           *://dhits.docomo.ne.jp/*
// @icon            http://www.google.com/s2/favicons?domain=https://dhits.docomo.ne.jp&sz=128
// ==/UserScript==



window.addEventListener("load", () => {
    const download_svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="24px" height="24px" viewBox="-0.5 -0.5 175 212"><g><path d="M 112.18 38.06 L 173.94 38.06 L 173.94 211 L 1 211 L 1 38.06 L 62.76 38.06" fill="none" stroke="#000"/><path d="M 38.06 99.82 L 87.47 149.24 L 136.88 99.82 M 87.47 1 L 87.47 149.24" fill="none" stroke="#000"/></g></svg>`

    document.querySelectorAll(`article > section[class="content-main"]`).forEach(section => {
        if (section.querySelector(`.song-list-detail`)) {
            return
        }

        section.querySelectorAll(`div[class="sl-item"]`).forEach((item) => {
            let song_id = item.querySelector(`[data-track-id]`).getAttribute("data-track-id")
            let song_title = item.querySelector(`[class="text-title"]`).innerText
    
            let download_button = document.createElement("a")
            download_button.innerHTML = download_svg
            // download_button.setAttribute("download", `${song_title}.m4a`)
            download_button.setAttribute("href", `https://recohls-mmd-cust.lldns.net/e1/bcapi/getMusicfile/service/dhitspc/id/${song_id}/quality/320/filename/${encodeURIComponent(song_title)}.m4a`)
            download_button.setAttribute("target", "_blank")
    
            console.log(song_id, song_title)
    
            item.querySelector(`div[class="il-icon"]`).insertAdjacentElement("beforeend", download_button)
        })
    })
})
