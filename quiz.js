const questions = [
  {
    question: "Which language runs in a web browser?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript",
  },
  {
    question: "What does CSS control?",
    options: ["Page styling", "Database queries", "Server hardware", "Git history"],
    answer: "Page styling",
  },
  {
    question: "Which HTML element creates a hyperlink?",
    options: ["<p>", "<img>", "<a>", "<section>"],
    answer: "<a>",
  },
];

const quiz = document.querySelector("#quiz");
const result = document.querySelector("#result");
const progress = document.querySelector("#progress");
const question = document.querySelector("#question");
const options = document.querySelector("#options");
const nextButton = document.querySelector("#nextBtn");
const restartButton = document.querySelector("#restartBtn");
const score = document.querySelector("#score");

let currentQuestion = 0;
let correctAnswers = 0;
let selectedAnswer = null;

function renderQuestion() {
  const current = questions[currentQuestion];
  selectedAnswer = null;
  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
  question.textContent = current.question;
  options.replaceChildren();
  nextButton.disabled = true;

  current.options.forEach((optionText) => {
    const option = document.createElement("button");
    option.className = "option";
    option.type = "button";
    option.textContent = optionText;
    option.addEventListener("click", () => selectAnswer(option, optionText));
    options.append(option);
  });
}

function selectAnswer(button, answer) {
  selectedAnswer = answer;
  document.querySelectorAll(".option").forEach((option) => option.classList.remove("selected"));
  button.classList.add("selected");
  nextButton.disabled = false;
}

function showResult() {
  quiz.hidden = true;
  result.hidden = false;
  score.textContent = `You scored ${correctAnswers} out of ${questions.length}.`;
}

nextButton.addEventListener("click", () => {
  if (selectedAnswer === questions[currentQuestion].answer) {
    correctAnswers += 1;
  }
  currentQuestion += 1;
  if (currentQuestion === questions.length) {
    showResult();
  } else {
    renderQuestion();
  }
});

restartButton.addEventListener("click", () => {
  currentQuestion = 0;
  correctAnswers = 0;
  result.hidden = true;
  quiz.hidden = false;
  renderQuestion();
});

renderQuestion();
