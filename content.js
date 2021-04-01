function sendMessage(message) {
    chrome.runtime.sendMessage({ message: message })
}

function getPagePriceSum() {
    let work_price = document.getElementsByClassName("work_price")
    let price = 0;
    for (let i = 1; i < work_price.length; i++) {
        price += parseInt(work_price.item(i).innerHTML)
    }
    return price
}

function run() {
    chrome.storage.sync.get("sum", ({ sum }) => {
        sum += getPagePriceSum();
        chrome.storage.sync.set({ sum })
    })

    page_total = document.getElementsByClassName("page_total")[0].firstElementChild.innerHTML
    page_total = parseInt(page_total)
    page_total = Math.ceil(page_total / 50)
    currect_page = document.getElementsByTagName("strong")
    currect_page = currect_page.item(currect_page.length - 1)
    currect_page = currect_page.innerHTML.valueOf()

    page = parseInt(currect_page) + 1
    chrome.storage.sync.set({ page })

    if (currect_page < page_total) {
        sendMessage(0)
    } else if (currect_page == page_total) {
        sendMessage(1)
    }
}

chrome.storage.sync.get("flag", ({ flag }) => {
    if(flag) run()
})
