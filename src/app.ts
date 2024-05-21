const inputBox: HTMLInputElement = document.getElementById("input-box") as HTMLInputElement;
const button: HTMLButtonElement = document.querySelector("button")!;
const list: HTMLUListElement = document.getElementById("list-container") as HTMLUListElement;


function addTask(): void {
    if (inputBox.value === '') {
        alert("you must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        list.appendChild(li);
        inputBox.value = '';
        let span = document.createElement("span");
        span.innerHTML = "x";
        li.appendChild(span);
    }
    saveData();
}
button.addEventListener("click", addTask);

list.addEventListener("click", (e: MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "LI") {
        (e.target as HTMLElement).classList.toggle("checked");
        saveData();
    } else if ((e.target as HTMLElement).tagName === "SPAN") {
        (e.target as HTMLElement).parentElement!.remove();
        saveData();
    }
});

function saveData(): void {
    localStorage.setItem("data", list.innerHTML);
}

function showTask(): void {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        list.innerHTML = savedData;
    }
}

window.addEventListener("load", showTask);