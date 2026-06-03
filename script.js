function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  const li = document.createElement("li");
  li.className = "priority-medium";
  li.innerHTML = `
    <span>${text}</span>
    <select onchange="this.parentElement.className='priority-'+this.value">
      <option value="low">🟢 Low</option>
      <option value="medium" selected>🟡 Medium</option>
      <option value="high">🔴 High</option>
    </select>
    <button onclick="this.parentElement.remove()">❌</button>
  `;

  document.getElementById("taskList").appendChild(li);
  input.value = "";
}

document.getElementById("taskInput").addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});
