let text = document.getElementById("text")
let button = document.getElementById("button")


function createPage(page) {
    chrome.tabs.create({
        url: "https://www.dlsite.com/pro/mypage/userbuy/=/type/all/start/all/sort/1/order/1/page/" + page
    })
}

button.addEventListener("click", async () => {
    page = 1
    sum = 0
    flag = true
    chrome.storage.sync.set({ sum })
    chrome.storage.sync.set({ page })
    chrome.storage.sync.set({ flag })
    createPage(page)
})

chrome.storage.sync.get("sum", ({ sum }) => {
    text.innerHTML = sum;
});