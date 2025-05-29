const form = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskTime = document.getElementById("task-time");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";
    li.innerHTML = `
      <span>${task.text} - ${new Date(task.time).toLocaleString()}</span>
      <div class="task-actions">
        <button onclick="confirmCompletion(${index})">✓</button>
        <button onclick="editTask(${index})">✎</button>
        <button onclick="deleteTask(${index})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

function confirmCompletion(index) {
  const confirmBox = confirm("Have you completed this task?");
  if (confirmBox) {
    tasks[index].completed = true;
    saveTasks();
    renderTasks();

    const addNext = confirm("Do you want to add the next task?");
    if (addNext) {
      const newTask = prompt("Enter next task:");
      const timeInput = prompt("Enter date and time (YYYY-MM-DDTHH:MM):");
      if (newTask && timeInput) {
        tasks.push({ text: newTask, time: timeInput, completed: false });
        saveTasks();
        renderTasks();
      }
    }
  }
}

function editTask(index) {
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText;
    saveTasks();
    renderTasks();
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const task = {
    text: taskInput.value,
    time: taskTime.value,
    completed: false,
  };
  tasks.push(task);
  saveTasks();
  renderTasks();
  form.reset();
});

renderTasks();
