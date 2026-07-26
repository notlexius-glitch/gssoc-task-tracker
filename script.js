let tasks;
try {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!Array.isArray(tasks)) tasks = [];
} catch {
  tasks = [];
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task;

    const editBtn = document.createElement("button");
    editBtn.textContent = "✏️";
    editBtn.className = "edit-btn";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.className = "delete-btn";

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    editBtn.addEventListener("click", () => editTask(li, index));
    
    deleteBtn.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  tasks.push(text);

  saveTasks();
  renderTasks();

  input.value = "";
}

function editTask(li, index) {
  const span = li.querySelector("span");
  const editBtn = li.querySelector(".edit-btn");

  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  input.className = "edit-input";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "💾";
  saveBtn.className = "save-btn";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = "❌";
  cancelBtn.className = "cancel-btn";

  li.replaceChild(input, span);
  li.replaceChild(saveBtn, editBtn);
  li.appendChild(cancelBtn);

  input.focus();

  function saveEdit() {
    const val = input.value.trim();

    if (val) {
      tasks[index] = val;
      saveTasks();
    }
    renderTasks();
  }

  function cancelEdit() {
    renderTasks();
  }

  saveBtn.addEventListener("click", saveEdit);
  cancelBtn.addEventListener("click", cancelEdit);

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      cancelEdit();
    }
  });
}

document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});

renderTasks();