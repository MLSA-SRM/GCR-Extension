console.log("Background scripts running...");

// function pageScroll() {
    // var startTime = new Date().getTime();
    // var interval = setInterval(function () {
    //     if (new Date().getTime() - startTime > 25000) {
    //         clearInterval(interval);
    //         buttonClicked();
    //         return;
    //     }
    //     window.scrollBy(0,10000);
    // }, 2000);
    // var flag = 0;
    const targetNode = document.getElementsByClassName('zOtZye LBlAUc GWZ7yf nmFHZb')[0].nextSibling;
    const config = { childList: true };
    const callback = function (mutationsList, observer) {
        window.scrollBy(0, 10000);
        var links = document.getElementsByClassName('uqZtlf x0HGk QRiHXd MymH0d maXJsd'), hrefs = [];
        for (var i = 0; i < links.length; i++) {
            hrefs.push(links[i].href);
            hrefs = Array.from(new Set(hrefs));
            titles.push(links[i].title);
            titles = Array.from(new Set(titles));
        }
        console.log(hrefs);
        console.log(titles)
        var titleLinks = {
            hrefList: hrefs,
            titleList: titles
        };
        // document.addEventListener("DOMContentLoaded", () => {
        //     console.log("yes we are inside")
        //     // observer.disconnect();
        //     flag = 1;
        // });
    };
    // if(flag == 1){
    //     buttonClicked();
    // }
    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    window.scrollBy(0, 10000);



// }
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


// pageScroll();
