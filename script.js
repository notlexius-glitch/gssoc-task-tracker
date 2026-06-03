function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;
  const li = createTaskElement(text);
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function createTaskElement(text) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;

  const editBtn = document.createElement("button");
  editBtn.textContent = "✏️";
  editBtn.onclick = () => editTask(li, span);

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.onclick = () => li.remove();

  li.appendChild(span);
  li.appendChild(editBtn);
  li.appendChild(delBtn);
  return li;
}

function editTask(li, span) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = span.textContent;
  input.className = "edit-input";

  const saveBtn = document.createElement("button");
  saveBtn.textContent = "💾";
  saveBtn.onclick = () => {
    const val = input.value.trim();
    if (val) {
      span.textContent = val;
      li.replaceChild(span, input);
      li.replaceChild(editBtn, saveBtn);
    }
  };

  const editBtn = li.querySelector("button:nth-child(2)");
  li.replaceChild(input, span);
  li.replaceChild(saveBtn, editBtn);
  input.focus();
}

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
