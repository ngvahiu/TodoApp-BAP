"use strict";
var inputBox = document.getElementById("input-box");
var inputUpdate = document.getElementById("update-input");
var button = document.querySelector("button");
var list = document.getElementById("list-container");
var currentTodo = null;
// Add Task
function addTask() {
    if (inputBox.value === '') {
        alert("you must write something!");
    }
    else {
        var li = document.createElement("li");
        var p = document.createElement("p");
        p.innerText = inputBox.value;
        li.appendChild(p);
        list.appendChild(li);
        inputBox.value = '';
        var button_1 = document.createElement("button");
        button_1.innerHTML = "Update";
        var span = document.createElement("span");
        span.innerHTML = "x";
        var div = document.createElement("div");
        div.appendChild(button_1);
        div.appendChild(span);
        li.appendChild(div);
    }
    saveData();
}
button.addEventListener("click", addTask);
list.addEventListener("click", function (e) {
    var _a, _b, _c, _d, _e, _f;
    var target = e.target;
    if (target.tagName === "LI") {
        target.classList.toggle("checked"); // Update status of task
        saveData();
    }
    else if (target.tagName === "SPAN") { // Delete task
        (_a = target.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement.remove();
        saveData();
    }
    else if (target.tagName === "BUTTON") { // Turn on Modal to update task
        var modal_1 = document.querySelector(".modal");
        var span = modal_1 === null || modal_1 === void 0 ? void 0 : modal_1.querySelector(".close");
        var input = document.getElementById("update-input");
        input.value = (_e = (_d = (_c = (_b = target.parentElement) === null || _b === void 0 ? void 0 : _b.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector('p')) === null || _d === void 0 ? void 0 : _d.innerText) !== null && _e !== void 0 ? _e : '';
        currentTodo = (_f = target.parentElement) === null || _f === void 0 ? void 0 : _f.parentElement;
        modal_1.style.display = "block";
        span.onclick = function () {
            modal_1.style.display = "none";
        };
        window.onclick = function (event) {
            if (event.target == modal_1) {
                modal_1.style.display = "none";
            }
        };
    }
});
// Update Task
inputUpdate.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        if (currentTodo) {
            currentTodo.querySelector('p').innerText = inputUpdate.value;
            saveData();
            inputUpdate.value = '';
            var modal = document.querySelector(".modal");
            modal.style.display = "none";
        }
    }
});
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
