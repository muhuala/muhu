// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");
const itemsLeft = document.getElementById("itemsLeft");
const allButton = document.getElementById("allButton");
const activeButton = document.getElementById("activeButton");
const completedButton = document.getElementById("completedButton");
const clearCompletedButton = document.getElementById("clearCompletedButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  allButton.addEventListener("click", displayTasks);
  activeButton.addEventListener("click", displayActiveTasks);
  completedButton.addEventListener("click", displayCompletedTasks);
  clearCompletedButton.addEventListener("click", clearCompletedTasks);
  displayTasks();
});


document.querySelectorAll('.task-item input[type="checkbox"]').forEach(checkbox => {
  checkbox.addEventListener('change', function() {
    this.closest('.task-item').classList.toggle('done', this.checked);
  });
});


function validateInput(input) {
  const formattedInput = input.trim().toLowerCase();

  // Check if the input has fewer than three characters or starts with a number
  if (formattedInput.length < 3) {
    alert("Invalid input. Please enter at least three characters.");
    return false;
  }

  if (/^\d/.test(formattedInput.charAt(0))) {
    alert("Invalid input. The first character should not be a number.");
    return false;
  }

  // Check if the task already exists
  const existingTasks = todo.map(task => task.task.toLowerCase());
  if (existingTasks.includes(formattedInput)) {
    alert("The task name already exists!"); // Notify user if the task is a duplicate
    return false;
  }

  return true; 
}


function addTask() {
  const input = todoInput.value.trim();
  
  // Validate the input
  if (!validateInput(input)) {
    return; 
  }

  // Add the task to the todo list
  todo.push({ task: input, completed: false });
  saveToLocalStorage(); 
  displayTasks(); 
}


function displayTasks() {
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = item.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    const taskText = document.createElement("span");
    taskText.id = `todo-${index}`;
    taskText.textContent = item.task;
    taskText.className = item.completed ? "disabled" : "";
    taskText.addEventListener("click", () => editTask(index));

    // Last Update: Font Awesome delete icon with right alignment and transparent background
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete-button");
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'; // Using Font Awesome icon
    deleteButton.addEventListener("click", () => confirmDeleteTask(index));

    // Append elements to the task list item
    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    listItem.appendChild(deleteButton); // Add delete button on the right
    todoList.appendChild(listItem);
  });
  updateCounts();
}

// Last Update: Function to confirm and delete a single task
function confirmDeleteTask(index) {
  const confirmation = confirm("Are you sure you want to delete this task?");
  if (confirmation) {
    todo.splice(index, 1); 
    saveToLocalStorage(); 
    displayTasks();
  }
}

function displayActiveTasks() {
  todoList.innerHTML = "";
  todo.filter(item => !item.completed).forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = item.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    const taskText = document.createElement("span");
    taskText.id = `todo-${index}`;
    taskText.textContent = item.task;
    taskText.className = item.completed ? "disabled" : "";
    taskText.addEventListener("click", () => editTask(index));

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    todoList.appendChild(listItem);
  });
  updateCounts();
}

function displayCompletedTasks() {
  todoList.innerHTML = "";
  todo.filter(item => item.completed).forEach((item, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("todo-checkbox");
    checkbox.checked = item.completed;
    checkbox.addEventListener("change", () => toggleTask(index));

    const taskText = document.createElement("span");
    taskText.id = `todo-${index}`;
    taskText.textContent = item.task;
    taskText.className = item.completed ? "disabled" : "";
    taskText.addEventListener("click", () => editTask(index));

    listItem.appendChild(checkbox);
    listItem.appendChild(taskText);
    todoList.appendChild(listItem);
  });
  updateCounts();
}

function clearCompletedTasks() {
  // Check if there are completed tasks
  const completedTasks = todo.some(item => item.completed);

  if (completedTasks) {
    const confirmation = confirm("Are you sure you want to clear all completed tasks?");
    if (confirmation) {
      
      todo = todo.filter(item => !item.completed);
      saveToLocalStorage(); 
      displayTasks(); 
    }
  } else {
    alert("No completed tasks to clear."); 
  }
}


function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].task;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (validateInput(updatedText)) {
      todo[index].task = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].completed = !todo[index].completed;
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() {
  if (todo.length === 0) {
    alert("No tasks to delete.");
    return;
  }

  const confirmation = confirm("Are you sure you want to delete all tasks?");
  if (confirmation) {
    todo = [];
    saveToLocalStorage();
    displayTasks();
  }
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}

function updateCounts() {
  const activeCount = todo.filter(item => !item.completed).length;
  itemsLeft.textContent = `${activeCount} items left`;
  todoCount.textContent = todo.length;
}

// Filter tasks based on selection  ON small
document.getElementById("filterSelect").addEventListener("change", function () {
  const action = this.value;

  switch(action) {
    case "all":
      displayTasks();
      break;
    case "active":
      displayActiveTasks();
      break;
    case "completed":
      displayCompletedTasks();
      break;
    case "clearCompleted":
      clearCompletedTasks();
      break;
    case "deleteAll":
      deleteAllTasks();
      break;
  }

  // Reset dropdown to default
  this.value = "all";
});
