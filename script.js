let dragSrc = null;

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  const li = createLi(text);
  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

function createLi(text) {
  const li = document.createElement("li");
  li.draggable = true;
  li.innerHTML = `
    <span class="drag-handle">⠿</span>
    <span>${text}</span>
    <button onclick="this.parentElement.remove()">❌</button>
  `;

  li.addEventListener("dragstart", (e) => {
    dragSrc = li;
    li.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
  });

  li.addEventListener("dragend", () => {
    li.classList.remove("dragging");
    dragSrc = null;
  });

  li.addEventListener("dragover", (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  li.addEventListener("drop", (e) => {
    e.preventDefault();
    if (dragSrc && dragSrc !== li) {
      const parent = document.getElementById("taskList");
      const items = Array.from(parent.children);
      const srcIdx = items.indexOf(dragSrc);
      const tgtIdx = items.indexOf(li);
      if (srcIdx < tgtIdx) {
        li.parentNode.insertBefore(dragSrc, li.nextSibling);
      } else {
        li.parentNode.insertBefore(dragSrc, li);
      }
    }
  });

  return li;
}

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
