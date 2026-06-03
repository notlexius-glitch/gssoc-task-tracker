function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.className = "edit-btn";

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.className = "delete-btn";

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(deleteBtn);

  editBtn.addEventListener("click", () => editTask(li));
  deleteBtn.addEventListener("click", () => li.remove());

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function editTask(li) {
  const span = li.querySelector("span");
  const editBtn = li.querySelector(".edit-btn");

  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  input.className = "edit-input";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "💾";
  saveBtn.className = "save-btn";

  li.replaceChild(input, span);
  li.replaceChild(saveBtn, editBtn);
  input.focus();

  saveBtn.addEventListener("click", () => {
    const val = input.value.trim();
    if (val) {
      span.textContent = val;
      li.replaceChild(span, input);
      li.replaceChild(editBtn, saveBtn);
    }
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveBtn.click();
  });
}

document.getElementById("addBtn").addEventListener("click", addTask);

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    addTask();
  }
});
