// ==UserScript==
// @name            d/ヒ/ッ/ツ/のやつ
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024.04.10.0239
// @description     m4a
// @author          PC-CNT
// @license         MIT
// @match           *://dhits.docomo.ne.jp/*
// @icon            http://www.google.com/s2/favicons?domain=https://dhits.docomo.ne.jp&sz=128
// ==/UserScript==


(() => {
    const download_svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" width="28px" viewBox="-0.5 -0.5 208 208"><g><path d="M 104 145.96 L 55.11 102.13 L 75.56 102.04 L 75.56 52.27 L 130.04 52.27 L 130.04 102.04 L 153.07 102.04 Z M 54.93 171.38 L 55.02 165.24 L 153.07 165.24 L 153.07 171.38 Z" fill="#555" stroke="none" /></g></svg>`
    const target = document
    const config = {
        childList: true,
        subtree: true,
        attributes: true
    }
    const observer = new MutationObserver(() => {
        observer.disconnect()
        document.querySelectorAll(`article > section[class="content-main"]`).forEach(section => {
            if (section.querySelector(`[class="artist-list"], [data-song-type="program"], #programList, #goodsContainer`)) {
                return
            }

            section.querySelectorAll(`div[class="sl-item"]`).forEach((item) => {
                if (item.querySelector(`a[class="m4a-button"]`)) {
                    return
                }
                if (!item.querySelector(`[data-track-id]`)) {
                    return
                }
                let song_id = item.querySelector(`[data-track-id]`).getAttribute("data-track-id")
                let song_title = item.querySelector(`[class="text-title"]`).innerText

                let m4a_button = document.createElement("a")
                m4a_button.innerHTML = download_svg
                m4a_button.setAttribute("href", `https://recohls-mmd-cust.lldns.net/e1/bcapi/getMusicfile/service/dhitspc/id/${song_id}/quality/320/filename/${encodeURIComponent(song_title)}.m4a`)
                m4a_button.setAttribute("target", "_blank")
                m4a_button.style.display = "flex"
                m4a_button.style.alignItems = "center"
                m4a_button.style.marginLeft = "12px"
                m4a_button.classList.add("m4a-button")

                item.insertAdjacentElement("beforeend", m4a_button)
            })
        })
        observer.observe(target, config)
    })
    observer.observe(target, config)
})()
