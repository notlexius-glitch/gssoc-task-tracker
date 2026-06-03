function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();

  if (text === "") return;

  const li = document.createElement("li");
  li.innerHTML = `
    ${text}
    <button onclick="this.parentElement.remove()">❌</button>
  `;

  document.getElementById("taskList").appendChild(li);

  input.value = "";
}