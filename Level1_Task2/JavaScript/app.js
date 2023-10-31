const taskInput = document.getElementById("task");
const taskList = document.getElementById("taskList");

function createTaskElement(taskText) {
  const li = document.createElement("li");
  const taskDiv = document.createElement("div");
  taskDiv.className = "task-container"; // Add a class for styling Task

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;

  const buttonsDiv = document.createElement("div");
  buttonsDiv.className = "buttons-container"; // Add a class for styling Buttons

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.className = "edit"; // Add the "edit" class
  editButton.addEventListener("click", () => editTask(li));

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.className = "delete"; // Add the "delete" class
  deleteButton.addEventListener("click", () => deleteTask(li));

  taskDiv.appendChild(taskContent);

  buttonsDiv.appendChild(editButton);
  buttonsDiv.appendChild(deleteButton);

  taskDiv.appendChild(buttonsDiv);

  li.appendChild(taskDiv);

  taskList.appendChild(li);
  taskInput.value = "";
}

// Add a new task
function addTask() {
  const taskText = taskInput.value;
  if (taskText.trim() !== "") {
    createTaskElement(taskText);
    saveTasks();
  }
}

// Edit a task
function editTask(taskItem) {
  const taskDiv = taskItem.querySelector("div");
  const taskContent = taskDiv.querySelector("span");
  const newText = prompt("Edit task:", taskContent.textContent);
  if (newText !== null) {
    taskContent.textContent = newText;
    saveTasks();
  }
}

// Delete a task
function deleteTask(taskItem) {
  taskList.removeChild(taskItem);
  saveTasks();
}

function saveTasks() {
  const tasks = Array.from(taskList.children).map(
    (task) => task.querySelector("span").textContent
  );
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (const task of tasks) {
    createTaskElement(task);
  }
}

// Load tasks when the page loads
loadTasks();
