"use strict";
var inputBox = document.getElementById("input-box");
var button = document.querySelector("button");
var list = document.getElementById("list-container");
function addTask() {
    if (inputBox.value === '') {
        alert("you must write something!");
    }
    else {
        var li = document.createElement("li");
        li.innerHTML = inputBox.value;
        list.appendChild(li);
        inputBox.value = '';
        var span = document.createElement("span");
        span.innerHTML = "x";
        li.appendChild(span);
    }
    saveData();
}
list.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
});
button.addEventListener("click", addTask);
function saveData() {
    localStorage.setItem("data", list.innerHTML);
}
function showTask() {
    var savedData = localStorage.getItem("data");
    if (savedData) {
        list.innerHTML = savedData;
    }
}
window.addEventListener("load", showTask);
