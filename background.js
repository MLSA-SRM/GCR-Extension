// Scrolls page automatically for upto 25 seconds 
function pageScroll() {
    var startTime = new Date().getTime(); var interval = setInterval(function () {
        if (new Date().getTime() - startTime > 25000) { clearInterval(interval); buttonClicked(); return }
        window.scrollBy(0, 10000)
    }, 2000)
}
var titles = []; function buttonClicked() {
    // Extracts the URLs for all the elements with the given class name having all the documents
    var links = document.getElementsByClassName('uqZtlf x0HGk QRiHXd MymH0d maXJsd'), hrefs = [];
    for (var i = 0; i < links.length; i++) {
        hrefs.push(links[i].href);
        titles.push(links[i].title)
    }
    var titleLinks = { hrefList: hrefs, titleList: titles };

    // Send the javascript object of title of document and link of document to the extension javascript file
    chrome.runtime.sendMessage(titleLinks)
}
// Receives request from content.js to scroll a document into view
chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    var elementIndex = titles.indexOf(response);
    var element = document.getElementsByClassName('uqZtlf x0HGk QRiHXd MymH0d maXJsd')[elementIndex];
    element.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
    })
});

// Function call to initiate auto page scrolling
pageScroll()
