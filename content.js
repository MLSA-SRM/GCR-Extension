console.log("Chrome extension is up and running...");

document.addEventListener("DOMContentLoaded", ()=>{document.getElementById("runScript").addEventListener("click",getLinks)});

function getLinks()
{
    chrome.tabs.executeScript({file: "background.js"});
}