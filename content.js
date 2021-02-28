// Waits for receiving the list of extracted links from background.js
chrome.runtime.onMessage.addListener(function (response, sender, sendResponse) {
    // Toggling visibility state of various HTML elements ONLY when they are loaded

    var loadingAnimation = document.querySelector(".loadingAni");
    if (loadingAnimation) {
        document.querySelector(".loadingAni").style.display = "none";
    }
    document.querySelector("h1").style.display = "none";

    var titlesmall = document.querySelector("#titleSmall");
    if (titlesmall) {
        document.querySelector("#titleSmall").style.display = "block";
    }

    var downloadButton = document.querySelector("#dwnbtn");
    if (downloadButton) {
        document.querySelector("#dwnbtn").style.display = "block";
    }

    var titlebox = document.querySelector(".titleBox");
    if (titlebox) {
        document.querySelector(".titleBox").style.display = "block";
    }

    var cancelbox = document.querySelector(".cancelBox");
    if (cancelbox) {
        document.querySelector(".cancelBox").style.backgroundColor = "#ffffff";
    }

    var sh = document.querySelector("#subheading");
    if (sh) {
        document.querySelector("#subheading").style.fontSize = "2rem";
    }

    var ul = document.getElementById("titleList");
    if (response["titleList"]) {
        for (var i = 0; i < response["titleList"].length; i++) {
            console.log(response);
            // Create a new list item for every document extracted from page
            var li = document.createElement("li");
            li.setAttribute("class", "titleItems");
            var checkBox = document.createElement("INPUT");
            checkBox.setAttribute("type", "checkbox");
            checkBox.setAttribute("value", i);
            checkBox.className = "check";

            // Parse the extension name received and display the corresponding filetype icon
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
            // Appends newly made list item of file names into the unordered list
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


        // Function to select all/deselect all checkboxes 
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

        // Counter for number of items that are selected
        function checkedCount() {
            if (this.checked == true) {
                ++numberOfCheckedItems;
            }
            else if (this.checked == false) {
                --numberOfCheckedItems;
            }
            document.getElementById("selectedCount").innerHTML = numberOfCheckedItems + " / " + response["titleList"].length + " selected";
        }

        // Function triggered when "Download Files" button is clicked
        document.getElementById("dwnbtn").addEventListener("click", function () {
            var checkboxes = document.getElementsByClassName("check");
            var selectedFiles = [];
            var selectedLinks = [];
            for (var i = 0; i < checkboxes.length; i++) {
                if (checkboxes[i].checked) {
                    selectedFiles.push(parseInt(checkboxes[i].value));
                }

            }
            for (j = 0; j < selectedFiles.length; j++) {
                var selectedValue = selectedFiles[j];
                selectedLinks.push(response["hrefList"][selectedValue]);
            }

            // Manipulation of drive links to make it downloadable document
            var downloadWindows = [];
            for (var k = 0; k < selectedFiles.length; k++) {
                var str = selectedLinks[k];
                var downloadableLink = str.replace("open", "uc");
                downloadableLink = downloadableLink + "&export=download";
                var downloadWindow = window.open(downloadableLink, "_blank", "fullscreen=yes");
                downloadWindows.push(downloadWindow);

            }
            setTimeout(function () {
                for (var l = 0; l < downloadWindows.length; l++) {
                    downloadWindows[l].close();
                }
            }, 20000);
        });

        // Function to scrollIntoView the document name that is clicked
        for (var j = 0; j < response["titleList"].length; j++) {
            document.querySelectorAll(".titleItems")[j].addEventListener("click", sendFileName);
        }
        function sendFileName() {
            var fileClicked = this.innerHTML;
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, fileClicked)
            });
        }
    }
});

// Reload the extension HTML page when cancel button is clicked
var cancelElement = document.getElementById("cancel");
if (cancelElement) {
    document.getElementById("cancel").addEventListener("click", function () {
        chrome.tabs.executeScript({ code: `location.reload();` });
        location.reload();
    });
}

document.addEventListener("DOMContentLoaded", () => { document.getElementById("runScript").addEventListener("click", getLinks) });

// Function executed to run background scripts
function getLinks() {
    chrome.tabs.executeScript({ file: "background.js" });
    document.querySelector("h2").innerHTML = "Please wait while we scroll through the page and extract links!";
    document.getElementById("runScript").style.display = "none";
    document.querySelector(".loadingAni").style.display = "block";
    document.querySelector(".cancelBox").style.display = "block";

}



