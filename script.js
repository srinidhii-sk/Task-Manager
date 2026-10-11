// script.js

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");

// SIDEBAR LINKS
const filterLinks = document.querySelectorAll(".sidebar nav a");

let tasks = [];

// CURRENT FILTER
let currentFilter = "all";

// ADD TASK
addTaskBtn.addEventListener("click", addTask);

// ENTER KEY SUPPORT
taskInput.addEventListener("keypress", function(e){

  if(e.key === "Enter"){
    addTask();
  }

});

function addTask(){

  const text = taskInput.value.trim();

  if(text === ""){
    alert("Please enter a task");
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false
  };

  tasks.push(task);

  taskInput.value = "";

  renderTasks();
}

// FILTER SIDEBAR CLICK

filterLinks.forEach(link => {

  link.addEventListener("click", function(e){

    e.preventDefault();

    // REMOVE ACTIVE CLASS
    filterLinks.forEach(item => item.classList.remove("active"));

    // ADD ACTIVE CLASS
    this.classList.add("active");

    // GET FILTER TEXT
    const text = this.innerText.trim();

    if(text.includes("All")){
      currentFilter = "all";
    }
    else if(text.includes("Pending")){
      currentFilter = "pending";
    }
    else if(text.includes("Completed")){
      currentFilter = "completed";
    }

    renderTasks();

  });

});

// RENDER TASKS

function renderTasks(){

  taskList.innerHTML = "";

  let filteredTasks = tasks;

  // FILTER LOGIC
  if(currentFilter === "pending"){
    filteredTasks = tasks.filter(task => !task.completed);
  }

  else if(currentFilter === "completed"){
    filteredTasks = tasks.filter(task => task.completed);
  }

  // EMPTY MESSAGE
  if(filteredTasks.length === 0){

    taskList.innerHTML = `
      <div class="empty">
        <h3>No tasks found</h3>
      </div>
    `;

    updateStats();
    return;
  }

  filteredTasks.forEach(task => {

    const div = document.createElement("div");
    div.classList.add("task");

    if(task.completed){
      div.classList.add("completed-task");
    }

    div.innerHTML = `
      <div class="task-left">

        <i class="fa-solid fa-layer-group"></i>

        <h4>${task.text}</h4>

      </div>

      <div class="task-buttons">

        <button class="complete-btn" onclick="toggleTask(${task.id})">
          <i class="fa-solid fa-check"></i>
        </button>

        <button class="delete-btn" onclick="deleteTask(${task.id})">
          <i class="fa-solid fa-trash"></i>
        </button>

      </div>
    `;

    taskList.appendChild(div);
  });

  updateStats();
}

// TOGGLE TASK

function toggleTask(id){

  tasks = tasks.map(task => {

    if(task.id === id){
      task.completed = !task.completed;
    }

    return task;
  });

  renderTasks();
}

// DELETE TASK

function deleteTask(id){

  tasks = tasks.filter(task => task.id !== id);

  renderTasks();
}

// UPDATE STATS

function updateStats(){

  totalTasks.innerText = tasks.length;

  const completed = tasks.filter(task => task.completed).length;

  completedTasks.innerText = completed;

  pendingTasks.innerText = tasks.length - completed;
}

// INITIAL RENDER
renderTasks();