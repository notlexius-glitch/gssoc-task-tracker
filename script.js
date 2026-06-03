const STORAGE_KEY = "gssoc_tasks";

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  const list = document.getElementById("taskList");
  tasks.forEach((text) => {
    const li = createLi(text);
    list.appendChild(li);
  });
}

function saveTasks() {
  const items = document.querySelectorAll("#taskList li");
  const texts = Array.from(items).map((li) => li.firstChild.textContent.trim());
  localStorage.setItem(STORAGE_KEY, JSON.stringify(texts));
}

function createLi(text) {
  const li = document.createElement("li");
  li.innerHTML = `
    ${text}
    <button onclick="this.parentElement.remove(); saveTasks();">❌</button>
  `;
  return li;
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  document.getElementById("taskList").appendChild(createLi(text));
  input.value = "";
  saveTasks();
}

loadTasks();