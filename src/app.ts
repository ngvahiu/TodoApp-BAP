const inputBox: HTMLInputElement = document.getElementById("input-box") as HTMLInputElement;
const inputUpdate: HTMLInputElement = document.getElementById("update-input") as HTMLInputElement;
const button: HTMLButtonElement = document.querySelector("button")!;
const list: HTMLUListElement = document.getElementById("list-container") as HTMLUListElement;

let currentTodo: HTMLLIElement | null = null;

// Add Task
function addTask(): void {
    if (inputBox.value === '') {
        alert("you must write something!");
    } else {
        let li: HTMLLIElement = document.createElement("li");
        let p: HTMLParagraphElement = document.createElement("p");
        p.innerText = inputBox.value;
        li.appendChild(p);
        list.appendChild(li);
        inputBox.value = '';

        let button: HTMLButtonElement = document.createElement("button");
        button.innerHTML = "Update";
        let span: HTMLSpanElement = document.createElement("span");
        span.innerHTML = "x";
        let div: HTMLDivElement = document.createElement("div");
        div.appendChild(button);
        div.appendChild(span);

        li.appendChild(div);
    }
    saveData();
}
button.addEventListener("click", addTask);

list.addEventListener("click", (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "LI") {
        target.classList.toggle("checked"); // Update status of task
        saveData();
    } else if (target.tagName === "SPAN") { // Delete task
        target.parentElement?.parentElement!.remove();
        saveData();
    } else if (target.tagName === "BUTTON") { // Turn on Modal to update task
        let modal: HTMLDivElement = document.querySelector(".modal") as HTMLDivElement;
        let span = modal?.querySelector(".close") as HTMLSpanElement;
        let input = document.getElementById("update-input") as HTMLInputElement;
        input.value = target.parentElement?.parentElement?.querySelector('p')?.innerText ?? '';
        currentTodo = target.parentElement?.parentElement as HTMLLIElement | null;

        modal.style.display = "block";

        span.onclick = () => {
            modal.style.display = "none";
        }

        window.onclick = (event) => {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }
});

// Update Task
inputUpdate.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.key === "Enter") {
        event.preventDefault();
        if (currentTodo) {
            currentTodo.querySelector('p')!.innerText = inputUpdate.value;
            saveData();
            inputUpdate.value = '';
            const modal: HTMLDivElement = document.querySelector(".modal") as HTMLDivElement;
            modal.style.display = "none";
        }
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