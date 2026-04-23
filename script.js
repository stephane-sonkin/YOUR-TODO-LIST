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
    todos = todos.filter((todo) => todo.id !== id);
    renderTodos();
}

// function toggleToo(id){
    
// }


