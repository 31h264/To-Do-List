document.addEventListener("DOMContentLoaded", function() {
    // Retrieve stored data from localStorage and populate the container
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.includes("inputData_")) {
            var inputData = JSON.parse(localStorage.getItem(key));
            addDivToContainer(inputData);
        }
    }
});

var popuplayout = document.querySelector(".popup-layout");
var boxpopup = document.querySelector(".popup-box");
var addnote = document.getElementById("add-note");

addnote.addEventListener("click", function () {
    popuplayout.style.display = "block";
    boxpopup.style.display = "block";
});

var cancel = document.getElementById("cancel-input");

cancel.addEventListener("click", function (event) {
    event.preventDefault();
    popuplayout.style.display = "none";
    boxpopup.style.display = "none";
});

var container = document.querySelector(".container");
var titleinput = document.getElementById("title-input");
var subtitle = document.getElementById("sub-title-input");
var linkinput = document.getElementById("link-input");
var addinput = document.getElementById("add-input");

addinput.addEventListener("click", function (event) {
    event.preventDefault();
    var inputData = {
        title: titleinput.value,
        subtitle: subtitle.value,
        link: linkinput.value
    };

    addDivToContainer(inputData);

    // Save input data to localStorage
    localStorage.setItem('inputData_' + Date.now(), JSON.stringify(inputData));

    popuplayout.style.display = "none";
    boxpopup.style.display = "none";
});

function addDivToContainer(inputData) {
    var div = document.createElement("div");
    div.setAttribute("class", "map-container");
    div.innerHTML = `<h1>${inputData.title}</h1>
    <p>${inputData.subtitle}</p>
    <p>${inputData.link}</p> <br> <button onclick="delet(event)">Completed</button>`;
    container.appendChild(div);
}

function delet(event) {
    var containerDiv = event.target.parentElement;
    // Remove from DOM
    containerDiv.remove();
    // Remove from localStorage
    for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (key.includes("inputData_")) {
            var storedData = JSON.parse(localStorage.getItem(key));
            if (storedData.title === containerDiv.querySelector("h1").innerText &&
                storedData.subtitle === containerDiv.querySelector("p").innerText &&
                storedData.link === containerDiv.querySelectorAll("p")[1].innerText) {
                localStorage.removeItem(key);
                break;
            }
        }
    }
}
