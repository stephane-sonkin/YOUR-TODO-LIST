let todoInput = document.querySelector("todo-input");
let addBtn = document.querySelector("add");
let todoForm = document.querySelector("todo-form");
let todoList = document.querySelector("todo-list");

let tabTask = [];

function addTodo(){
    const value = todoInput.value;
    
    if(value.trim() === "") return;
    
    const newTask = {
        id: Date.now(),
        text: value,
        completed: false
    };
    
    tabTask.push(newTask);
    todoInput.value = "";
}

console.log(tabTask[0]);

// function renderTodos(){
//     for(i = 0; i < tabTask.length; i++){
//         const task = document.createElement("li");
//         const taskText = document.createTextNode()
//     }

// }