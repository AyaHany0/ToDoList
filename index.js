const start = document.getElementById("start");
const content = document.getElementById("content");
const modal = document.getElementById("nameModal");
const btnText = document.querySelector(".btn-text");
const planeIcon = document.querySelector(".plane-icon");
const userName = document.getElementById("userName");
const submitName = document.getElementById("submitName");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const addTaskBtn = document.getElementById("addTaskBtn");
const editTaskModal = document.getElementById("editTaskModal");
const editTaskInput = document.getElementById("editTaskInput");
const saveEditBtn = document.getElementById("saveEditBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
// Initialize Vanta.js background animation
VANTA.CLOUDS({
  el: "#vanta-bg",
  skyColor: 0x3873b8, // Light Sky Blue
  cloudColor: 0xadc1de, // Pure White
  cloudShadowColor: 0x183550, // Light Steel Blue
  sunColor: 0xff9919, // Golden Yellow
  sunGlareColor: 0xff6633, // Lemon Chiffon
  sunlightColor: 0xff9933, // Light Amber
  speed: 0.8, // Customize animation speed
});

// Start button click handler
start.onclick = () => {
  btnText.classList.add("fade-out");
  setTimeout(() => {
    btnText.classList.add("hidden");
    planeIcon.classList.remove("hidden"); // Show the plane
    planeIcon.classList.add("show-plane"); // Animate the plane
  }, 1000);

  setTimeout(() => {
    content.style.display = "none";
    modal.classList.add("visible");
  }, 2000);
};

// Submit name button click handler
submitName.onclick = () => {
  const user = userName.value;
  if (user.trim() !== "") {
    modal.classList.remove("visible");
    document.getElementById("list").classList.remove("hidden");
  } else {
    document.getElementById("alert").classList.remove("hidden");
  }
};

// Initialize task array and load tasks from localStorage if available
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

let editindex = null;

// Clear input fields after adding a task
function clearInputs() {
  taskInput.value = null;
}
function showNotification(message) {
  const notification = document.getElementById("notification");
  const notificationMessage = document.getElementById("notification-message");

  // Set the notification message
  notificationMessage.textContent = message;

  // Show notification with animation
  notification.classList.add("show");
  notification.classList.remove("hidden");

  // Automatically hide the notification after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
    notification.classList.add("hidden");
  }, 4000);
}

// Add a task to the list
function addTask(taskText) {
  if (taskText.trim() === "") {
    document.querySelector(".taskempty").classList.remove("hidden");
    return;
  }

  document.querySelector(".taskempty").classList.add("hidden");

  const task = { id: Date.now(), text: taskText, completed: false };
  tasks.push(task);

  // Store the updated task list in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Clear the input and display the updated tasks
  clearInputs();
  displayTasks();
  showNotification("Task added successfully!");
}
// assign the add task function to the add task button
addTaskBtn.onclick = () => {
  const text = taskInput.value;

  addTask(text);
};
// assign the add task function to enter key
taskInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const taskText = taskInput.value;
    addTask(taskText);
  }
});
// Display all tasks
function displayTasks() {
  taskList.innerHTML = ""; // Clear the list before rendering

  tasks.forEach((task, index) => {
    taskList.innerHTML += `
      <li>
         <p class="taskname ${task.completed ? "completed" : ""}">
          <input type="checkbox" onchange='toggleComplete(${index})' ${
      task.completed ? "checked" : ""
    } />
          ${task.text}
        </p>
        <div class="btns">
          <button class="edit-btn" onclick='openEditModal(${index})'>Edit</button>
          <button class="delete-btn" onclick='deleteTask(${index})'>Delete</button>
        </div>
      </li>`;
  });
}

// Delete a task
function deleteTask(index) {
  tasks.splice(index, 1);

  // Update localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));

  // Redisplay tasks
  displayTasks();
  showNotification("Task deleted successfully!");
}

// Initialize the task list when the app starts
window.onload = () => {
  displayTasks();
};
function openEditModal(index) {
  editindex = index;
  editTaskInput.value = tasks[index].text;
  editTaskModal.classList.remove("hidden");
}
function closeEditModal() {
  editTaskModal.classList.add("hidden");
}

cancelEditBtn.onclick = closeEditModal;

saveEditBtn.onclick = () => {
  if (editTaskInput.value.trim() !== "") {
    tasks[editindex].text = editTaskInput.value;
    localStorage.setItem;
    "tasks", JSON.stringify(tasks);
    displayTasks();
    closeEditModal();
    showNotification("Task edited successfully!");
  }
};
submitName.onclick = () => {
  const user = userName.value;
  if (user.trim() !== "") {
    modal.classList.remove("visible");
    userGreeting.classList.remove("hidden");
    displayUserName.textContent = user;
    document.getElementById("list").classList.remove("hidden");
  } else {
    document.getElementById("alert").classList.remove("hidden");
  }
};
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks();
  if (tasks[index].completed) {
    showNotification("Task Compeleted!");
  } else {
    showNotification("Good,Give it another try!");
  }
}
