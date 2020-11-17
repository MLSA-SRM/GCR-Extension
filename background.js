console.log("background scripts running");
chrome.browserAction.onClicked.addListener(buttonClicked);

function buttonClicked(tab)
{
    //console.log(tab);

    let msg = {
        txt: "checking msging function"
    }
    chrome.tabs.sendMessage(tab.id, msg);
}