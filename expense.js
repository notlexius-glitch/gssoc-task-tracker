const STORAGE_KEY = "expenseTransactions";
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const form = document.getElementById("transactionForm");
const descriptionInput = document.getElementById("description");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const formMessage = document.getElementById("formMessage");
const transactionList = document.getElementById("transactionList");
const emptyState = document.getElementById("emptyState");

let transactions = loadTransactions();

function loadTransactions() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

function formatAmount(transaction) {
  const sign = transaction.type === "expense" ? "-" : "+";
  return `${sign}${currency.format(transaction.amount)}`;
}

function renderSummary() {
  const income = transactions
    .filter(transaction => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);
  const expenses = transactions
    .filter(transaction => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  document.getElementById("income").textContent = currency.format(income);
  document.getElementById("expenses").textContent = currency.format(expenses);
  document.getElementById("balance").textContent = currency.format(income - expenses);
}

function renderTransactions() {
  transactionList.replaceChildren();
  emptyState.hidden = transactions.length > 0;

  transactions.forEach(transaction => {
    const item = document.createElement("li");
    item.className = `transaction ${transaction.type}`;

    const info = document.createElement("div");
    info.className = "transaction-info";
    const description = document.createElement("strong");
    description.textContent = transaction.description;
    const type = document.createElement("span");
    type.textContent = transaction.type === "income" ? "Income" : "Expense";
    info.append(description, type);

    const amount = document.createElement("strong");
    amount.className = "transaction-amount";
    amount.textContent = formatAmount(transaction);

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-transaction";
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      transactions = transactions.filter(item => item.id !== transaction.id);
      saveTransactions();
      render();
    });

    item.append(info, amount, deleteButton);
    transactionList.append(item);
  });
}

function render() {
  renderSummary();
  renderTransactions();
}

form.addEventListener("submit", event => {
  event.preventDefault();
  const description = descriptionInput.value.trim();
  const amount = Number(amountInput.value);

  if (!description || !Number.isFinite(amount) || amount <= 0) {
    formMessage.textContent = "Enter a description and an amount greater than zero.";
    return;
  }

  transactions.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    description,
    amount,
    type: typeInput.value,
  });
  saveTransactions();
  form.reset();
  formMessage.textContent = "";
  render();
  descriptionInput.focus();
});

render();
