var btn = document.createElement("BUTTON");
btn.setAttribute("id", "dwnbtn");
btn.innerHTML = "Download Files";
document.body.appendChild(btn);
document.querySelector("#dwnbtn").style.display = "none";


chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    document.querySelector(".loadingAni").style.display = "none";
    // document.querySelector("#loadingBar").style.display = "none";
    // document.querySelector("#progressPercent").style.display = "none";

    var ul = document.getElementById("titleList");
    //for loop: file names
    for (var i = 0; i < response["titleList"].length; i++) {

        var titleArray = response["titleList"];
        var linkArray = response["hrefList"];
        var li = document.createElement("li");
        li.setAttribute("class", "titleItems");
        var checkBox = document.createElement("INPUT");
        checkBox.setAttribute("type", "checkbox");
        checkBox.setAttribute("value", i);
        checkBox.className = "check";

        var fileName = response["titleList"][i];
        var filePath = "";
        if (fileName.includes(".xlsx") || fileName.includes(".xls")) {
            filePath = "url('assets/excelFile.png')";
        }
        else if (fileName.includes(".docx") || fileName.includes(".doc")) {
            filePath = "url('assets/wordFile.png')";
        }
        else if (fileName.includes(".pptx") || fileName.includes(".ppt")) {
            filePath = "url('assets/powerpointFile.png')";
        }
        else if (fileName.includes(".pdf")) {
            filePath = "url('assets/pdfFile.png')";
        }
        else {
            filePath = "url('assets/file.png')";
        }
        li.appendChild(document.createTextNode(response["titleList"][i]));
        li.style.listStyleImage = filePath;
        ul.appendChild(li);
        ul.appendChild(checkBox);
        document.getElementById("links").innerHTML = "Extracted " + (i + 1) + " links...";
    }
    document.querySelector("#dwnbtn").style.display = "block";
    document.querySelector("#selAllCheck").style.display = "block";
    document.querySelector("#SAText").style.display = "block";

    // var SA = document.getElementById("selectAll");
    document.getElementById("selAllCheck").addEventListener("click", selectAllFunc);

    function selectAllFunc() {
        if (this.checked == true) {
            for (var i = 0; i < response["titleList"].length; i++) {
                document.querySelectorAll(".check")[i].checked = true;
                document.getElementById("selectedCount").innerHTML = response["titleList"].length + " / " + response["titleList"].length + " selected";

            }
        }
        else if (this.checked == false) {
            for (var i = 0; i < response["titleList"].length; i++) {
                document.querySelectorAll(".check")[i].checked = false;
                document.getElementById("selectedCount").innerHTML = "0" + " / " + response["titleList"].length + " selected";

            }
        }
    }


    var numberOfCheckedItems = 0;
    for (var j = 0; j < response["titleList"].length; j++) {
        document.querySelectorAll(".check")[j].addEventListener("click", checkedCount);
    }

    function checkedCount() {
        if (this.checked == true) {
            ++numberOfCheckedItems;
        }
        else if (this.checked == false) {
            --numberOfCheckedItems;
        }
        document.getElementById("selectedCount").innerHTML = numberOfCheckedItems + " / " + response["titleList"].length + " selected";
    }

    document.getElementById("dwnbtn").addEventListener("click", function () {
        var checkboxes = document.getElementsByClassName("check");
        var selectedFiles = [];
        var selectedLinks = [];
        var selectedTitles = [];
        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                selectedFiles.push(parseInt(checkboxes[i].value));
            }

        }
        for (j = 0; j < selectedFiles.length; j++) {
            var selectedValue = selectedFiles[j];
            selectedLinks.push(response["hrefList"][selectedValue]);
        }
        // JSONIFIED TITLE NAMES    
        // for(var k = 0; k < selectedFiles.length; k++){
        //     var selTitle = titleArray[k];
        //     selectedTitles.push(selTitle);
        // }
        for (var k = 0; k < selectedFiles.length; k++) {
            var str = selectedLinks[k];
            var downloadableLink = str.replace("open", "uc");
            downloadableLink = downloadableLink + "&export=download";
            window.open(downloadableLink);
        }
        var linksTitles = {
            URL: selectedLinks,
            Name: selectedTitles
        }
        console.log(JSON.stringify(linksTitles));
        // console.log(JSON.stringify(selectedTitles));

        //Refresh the extension to empty array
        location.reload();

        //POST Request to the API
        const url = 'https://randomuser.me/api'; //API link to be replaced

        let data = {
            dwnldLinks: selectedLinks
        }
        jsonObject = JSON.stringify(data);
        // console.log(jsonObject);

        /*var request = new Request(url, {
            method: 'POST',
            body: data,
            headers: new Headers()
        }); 

        fetch(request)
            .then(function () {
                // Handle response we get from the API
            })*/
    });

    for (var j = 0; j < response["titleList"].length; j++) {
        document.querySelectorAll(".titleItems")[j].addEventListener("click", sendFileName);
    }
    function sendFileName() {
        var fileClicked = this.innerHTML;
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, fileClicked)
        });
    }

});
// -- END OF chrome.runtime.onMessage() -- 

console.log("Chrome extension is up and running...");

document.addEventListener("DOMContentLoaded", () => { document.getElementById("runScript").addEventListener("click", getLinks) });

function getLinks() {
    chrome.tabs.executeScript({ file: "background.js" });
    document.getElementById("links").innerHTML = "Please wait while we scroll through the page and extract links!";
    document.querySelector(".loadingAni").style.display = "block";
    document.getElementById("runScript").disabled = true;
    // document.querySelector("#loadingBar").style.display = "block";
    // document.querySelector("#progressPercent").style.display = "block";

    // var startTime = (new Date()).getTime();
    // var interval = setInterval(function () {
    //     if ((new Date()).getTime() - startTime < 25000) {
    //         document.getElementById("loadingBar").value += 0.48;
    //         document.getElementById("progressPercent").innerHTML = Math.ceil(document.getElementById("loadingBar").value) + "% Completed"
    //         return;
    //     }
    //     clearInterval(interval);
    // }, 120);
}
