console.log("Background scripts running...");

function pageScroll() {
    var startTime = new Date().getTime();
    var interval = setInterval(function () {
        if (new Date().getTime() - startTime > 25000) {
            clearInterval(interval);
            console.log("Done! Now extracting links...");
            buttonClicked();
            return;
        }
        //do whatever here..
        window.scrollBy(0,10000);
    }, 2000);
    
}

function buttonClicked() {
    console.log("Inside the buttonClicked function")
    var links = document.getElementsByClassName('uqZtlf x0HGk QRiHXd MymH0d maXJsd'), hrefs = [];
    for (var i = 0; i < links.length; i++) {
        hrefs.push(links[i].href);
    }
    console.log(hrefs);
    // document.getElementById("links").innerHTML = hrefs;
}
pageScroll();
