function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    <span>${text}</span>
    <button class="edit-btn">✏️</button>
    <button class="delete-btn">❌</button>
  `;

  li.querySelector(".edit-btn").addEventListener("click", () => editTask(li));
  li.querySelector(".delete-btn").addEventListener("click", () => li.remove());

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
}

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
