let todoInput = document.querySelector("#todo-input");
let addBtn = document.querySelector("#add");
let todoForm = document.querySelector("#todo-form");
let todoList = document.querySelector("#todo-list");

let todos = [];


function addTodo(){
    const value = todoInput.value;

    const newTask = {
        ID: Date.now(),
        text: value,
        completed: false
    };

    todos.push(newTask);
    todoInput.value = "";
    saveToLocalStorage();
    renderTodos();
}

function renderTodos(){
    todos.forEach((todo) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = todo.completed;
        checkbox.addEventListener("change", () => toggleTodo(todo.ID))

        // Texte de la tâche
        const span = document.createElement("span");
        span.textContent = todo.text;
        if (todo.completed) {
        span.classList.add("completed");
        }

        // Delete button
        const deletebtn = document.createElement("button");
        deletebtn.textContent = "Delete";
        deletebtn.addEventListener("click", () => deleteTodo(todo.ID));

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deletebtn);
        todoList.appendChild(li);

        }
    )
}

function deleteTodo(id){
    todos = todos.filter((todo) => todo.ID !== id);
    renderTodos();
}

function toggleTodo(id){
    const todo = todos.find((todo) => todo.ID === id);
    if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage();
        renderTodos();
    }
}


function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");
  todos = storedTodos ? JSON.parse(storedTodos) : [];
  renderTodos();
}

// Load tasks on starting
loadFromLocalStorage();


