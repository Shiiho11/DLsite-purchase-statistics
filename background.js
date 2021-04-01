function changePage(page) {
    chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
        chrome.tabs.update(tab.id, {
            url: "https://www.dlsite.com/pro/mypage/userbuy/=/type/all/start/all/sort/1/order/1/page/" + page
        });
    });
}

function noti() {
    chrome.notifications.create("notification", {
        iconUrl: "favicon.ico",
        message: "Completed",
        title: "Completed",
        type: "basic"
    })
}

let sum = 0
let page = 1
let flag = false
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ sum })
    chrome.storage.sync.set({ page })
    chrome.storage.sync.set({ flag })
})

chrome.runtime.onMessage.addListener(({ message: message }) => {
    if (message == 0) {
        chrome.storage.sync.get("page", ({ page }) => {
            changePage(page)
        })
    } else if (message == 1) {
        flag = false;
        chrome.storage.sync.set({ flag })
        //noti()
    }
})