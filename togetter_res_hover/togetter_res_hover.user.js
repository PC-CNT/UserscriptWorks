// ==UserScript==
// @name            togetter - レス表示
// @namespace       https://github.com/PC-CNT/UserscriptWorks/
// @version         2024.01.14.0819
// @description     togetterの米欄でレスをマウスオーバーで表示するだけ
// @author          PC-CNT
// @license         MIT
// @match           *://togetter.com/li/*
// @icon            http://www.google.com/s2/favicons?domain=togetter.com&sz=128
// ==/UserScript==


(() => {
    const comment_box = document.querySelector(`#comment-box-portal`);

    const observer = new MutationObserver(() => {
        comment_box.querySelectorAll(`main`).forEach((main) => {
            main.querySelectorAll(`a`).forEach((a) => {
                if (a.getAttribute(`href`).match(/^\/li\/[0-9]+#.+&thread/)) {
                    let _hr;
                    a.addEventListener(`mouseover`, (e) => {
                        e.preventDefault()
                        _hr = comment_box.querySelector(`a[href="${a.getAttribute('href')}"]`).closest(`div[tabindex="-1"]`).cloneNode(true);
                        _hr.style.position = `absolute`;
                        _hr.style.left = `${e.clientX + window.scrollX + 16}px`;
                        _hr.style.top = `${e.clientY + window.scrollY + 16}px`;
                        _hr.style.zIndex = `99999`;
                        _hr.style.backgroundColor = `#eee`;
                        _hr.style.maxWidth = a.closest(`div[tabindex="-1"]`).offsetWidth + "px";
                        _hr.style.padding = `8px`;
                        _hr.style.border = `2px solid #ccc`
                        _hr.style.borderRadius = `4px`;
                        document.body.appendChild(_hr);
                    })
                    a.addEventListener(`mouseout`, (e) => {
                        _hr.remove();
                    })
                }
            })
        })
    });
    observer.observe(comment_box, {childList: true, subtree: true});
})();
