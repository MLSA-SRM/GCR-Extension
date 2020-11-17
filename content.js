console.log("chrome extension ready to go");

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, sendResponse)
{
    console.log(message.txt);

}

console.log(document.getElementsByClassName("lziZub tLDEHd"));