/**
 * script.js
 * Simple TODO list implementation.
 *
 * This file manages DOM interactions, task state and persistence (localStorage).
 * The comments and JSDoc blocks below explain the purpose, parameters and
 * side-effects of each function to professional standards.
 */

// ---------- DOM references -------------------------------------------------
// Reusable references to key DOM elements. Keep selectors in sync with HTML.
let todoInput = document.querySelector("#todo-input");
let addBtn = document.querySelector("#addi");
let todoList = document.querySelector("#todo-list");

// ---------- In-memory state ------------------------------------------------
// Array of task objects: { ID: Date, text: string, completed: boolean }
let todos = [];

// ---------- Event wiring ---------------------------------------------------

addBtn.addEventListener("click", addTodo);

// ---------- Core functions -------------------------------------------------
/**
 * addTodo
 * Create a new task from the current input value and update state + UI.
 * Side effects:
 *  - Mutates the `todos` array
 *  - Clears the input
 *  - Persists to localStorage
 *  - Triggers a re-render of the task list
 */
function addTodo() {
  const value = todoInput.value;

  // Guard: ignore empty or whitespace-only values.
  if (value.trim() === "") return;

  const newTask = {
    ID: Date.now(),
    text: value,
    completed: false,
  };

  todos.push(newTask);
  todoInput.value = ""; // reset input after adding
  saveToLocalStorage();
  renderTodos();
}

/**
 * renderTodos
 * Rebuilds the visible list of tasks from the `todos` state.
 * Implementation notes:
 *  - Clears `todoList.innerHTML` on each run to avoid duplicated DOM nodes.
 *  - Creates minimal accessible controls: checkbox, span (text), delete button.
 */
function renderTodos() {
  // Clear current list to avoid duplicated items on re-render
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const li = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.addEventListener("change", () => toggleTodo(todo.ID));

    // Texte de la tâche
    const span = document.createElement("span");
    span.textContent = todo.text;
    if (todo.completed) {
      span.classList.add("completed");
    }

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTodo(todo.ID));

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
}

/**
 * deleteTodo
 * Remove a task (by ID) from the `todos` array, persist and re-render.
 * @param {Date} id - Unique identifier of the task to remove
 */
function deleteTodo(id) {
  todos = todos.filter((todo) => todo.ID !== id);
  saveToLocalStorage();
  renderTodos();
}

/**
 * toggleTodo
 * Toggle the completed state of a task and update persistence/UI.
 * @param {Date} id - Unique identifier of the task to toggle
 */
function toggleTodo(id) {
  const todo = todos.find((todo) => todo.ID === id);
  if (todo) {
    todo.completed = !todo.completed;
    saveToLocalStorage();
    renderTodos();
  }
}

/**
 * saveToLocalStorage
 * Persist the `todos` array as JSON under the key 'todos'.
 */
function saveToLocalStorage() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

/**
 * loadFromLocalStorage
 * Hydrates `todos` from localStorage if present, then renders the list.
 */
function loadFromLocalStorage() {
  const storedTodos = localStorage.getItem("todos");
  todos = storedTodos ? JSON.parse(storedTodos) : [];
  renderTodos();
}

// Load tasks on starting
loadFromLocalStorage();
