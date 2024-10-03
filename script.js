document.addEventListener("DOMContentLoaded", loadTasks); // Load tasks on page load
document.querySelector("#addTaskBtn").addEventListener("click", addTask); // Add task on button click

// Function to add a new task
function addTask() {
    const taskTitle = document.getElementById("taskTitle").value;
    const taskPriority = document.getElementById("taskPriority").value;
    const taskTime = parseInt(document.getElementById("taskTime").value);

    if (taskTitle.trim() === "") return alert("Task title is required!");

    const task = {
        id: Date.now(),
        title: taskTitle,
        priority: taskPriority,
        completed: false
    };

    saveTask(task);
    renderTask(task);
    document.getElementById("taskTitle").value = ""; // Clear input
    document.getElementById("taskTime").value = ""; // Clear time input
}

// Save the task to local storage
function saveTask(task) {
    const tasks = getTasksFromStorage();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Get tasks from local storage
function getTasksFromStorage() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Render a single task
function renderTask(task) {
    const taskList = document.getElementById("taskList");
    
    // Create a new task list item
    const taskItem = document.createElement("li");
    taskItem.classList.add(task.priority);
    taskItem.setAttribute("data-id", task.id);

    // Add completed class if the task is completed
    if (task.completed) {
        taskItem.classList.add("completed");
    }

    taskItem.innerHTML = `
        <span class="task-title">${task.title}</span>
        <button class="complete-btn">✔</button>
        <button class="delete-btn">✘</button>
    `;

    // Add event listener for the complete button (✔)
    taskItem.querySelector(".complete-btn").addEventListener("click", () => toggleComplete(task.id));

    // Add event listener for the delete button (✘)
    taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));

    // Append the task item to the task list
    taskList.appendChild(taskItem);
}

// Toggle completion of a task
function toggleComplete(id) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(task => task.id === id);
    
    task.completed = !task.completed; // Toggle the completion status
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage

    refreshTasks(); // Re-render tasks
}

// Delete a task
function deleteTask(id) {
    let tasks = getTasksFromStorage();
    
    // Remove the task from the array by filtering it out
    tasks = tasks.filter(task => task.id !== id);

    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
    refreshTasks(); // Re-render tasks
}

// Refresh tasks: Clear the list and re-render all tasks from local storage
function refreshTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear the current list

    const tasks = getTasksFromStorage();
    tasks.forEach(task => renderTask(task)); // Render each task
}

// Load all tasks when the page loads
function loadTasks() {
    refreshTasks(); // Simply refresh the task list on page load
}


// Toggle the task's completion status (✔ button functionality)
function toggleComplete(id) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(task => task.id === id);
    
    task.completed = !task.completed; // Toggle the completed status
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Update local storage
  
    refreshTasks(); // Refresh the task list to reflect the changes
  }

  
  function renderTask(task) {
    const taskList = document.getElementById("taskList");
  
    const taskItem = document.createElement("li");
    taskItem.classList.add(task.priority);
    taskItem.setAttribute("data-id", task.id);
  
    // If the task is completed, add the completed class
    if (task.completed) {
      taskItem.classList.add("completed");
    }
  
    taskItem.innerHTML = `
      <span class="task-title">${task.title}</span>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✘</button>
    `;
  
    // Add event listeners for the buttons
    taskItem.querySelector(".complete-btn").addEventListener("click", () => toggleComplete(task.id));
    taskItem.querySelector(".delete-btn").addEventListener("click", () => deleteTask(task.id));
  
    taskList.appendChild(taskItem);
  }
  