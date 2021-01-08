console.log("Background scripts running...");

function pageScroll() {
    var startTime = new Date().getTime();
    var interval = setInterval(function () {
        if (new Date().getTime() - startTime > 25000) {
            clearInterval(interval);
            buttonClicked();
            return;
        }
        window.scrollBy(0,10000);
    }, 2000);

    
}
var jsonObject = {};
var titles = [];

function buttonClicked() {
    var links = document.getElementsByClassName('uqZtlf x0HGk QRiHXd MymH0d maXJsd'), hrefs = [];
    for (var i = 0; i < links.length; i++) {
        hrefs.push(links[i].href);
        titles.push(links[i].title);
    }
    console.log(hrefs);
    console.log(titles)
    // jsonObject = JSON.stringify(titles);
    var titleLinks = {
        hrefList: hrefs,
        titleList: titles
    };
    chrome.runtime.sendMessage(titleLinks);
}

// options = {
//     method: 'POST',
//     header: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//     },
//     // body: JSON.stringify({'title':hrefs, 'article':str1})
// }
//     fetch('init.py', jsonObject)
//     .then(response => response.json())
//     .then(data => {chrome.runtime.sendMessage(data)})

chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    var elementIndex = titles.indexOf(response);

    var element = document.getElementsByClassName('uqZtlf x0HGk QRiHXd MymH0d maXJsd')[elementIndex];
    element.scrollIntoView({
        behavior: "smooth", 
        block: "center",
        inline: "nearest"
    });

});


pageScroll();
