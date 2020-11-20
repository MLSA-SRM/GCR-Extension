console.log("chrome extension ready to go");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse)
{
    console.log(message.txt);
}


// start of code that looks for files with links in the preview mode 

function getPreviewLink()
{
    var className = 'VkhHKd e7EEH nQaZq';  // unique for each a/c
    var links = document.getElementsByClassName(className), hrefs = [];
    
    for (var i = 0; i < links.length; i++)
    {   
        hrefs.push(links[i].href);
    }

    console.log(hrefs);
    console.log(links.length);
}
setTimeout(getPreviewLink, 7000); 
                // the time can be modified. 7 secs seems to be optimal.

// end of code that looks for files with links in the preview mode 