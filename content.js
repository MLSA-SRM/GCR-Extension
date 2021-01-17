chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    document.querySelector(".loadingAni").style.display = "none";
    document.querySelector("h1").style.display = "none";
    document.querySelector("#titleSmall").style.display = "block";
    document.querySelector("#dwnbtn").style.display = "block";
    document.querySelector(".titleBox").style.display = "block";
    document.querySelector(".cancelBox").style.backgroundColor = "#ffffff";
    document.querySelector("#subheading").style.fontSize = "2rem";

    var ul = document.getElementById("titleList");
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
        document.querySelector("h2").innerHTML = (i + 1) + " files found!"
    }
    document.querySelector("#dwnbtn").style.display = "block";
    document.querySelector("#selAllCheck").style.display = "block";
    document.querySelector("#SAText").style.display = "block";

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

        for (var k = 0; k < selectedFiles.length; k++) {
            var str = selectedLinks[k];
            var downloadableLink = str.replace("open", "uc");
            downloadableLink = downloadableLink + "&export=download";
            window.open(downloadableLink);
        }

        location.reload();
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

document.getElementById("cancel").addEventListener("click", function(){
    location.reload();
})

document.addEventListener("DOMContentLoaded", () => { document.getElementById("runScript").addEventListener("click", getLinks) });

function getLinks() {
    chrome.tabs.executeScript({ file: "background.js" });
    document.querySelector("h2").innerHTML = "Please wait while we scroll through the page and extract links!";
    document.getElementById("runScript").style.display = "none";
    document.querySelector(".loadingAni").style.display = "block";
    document.querySelector(".cancelBox").style.display = "block";

}
