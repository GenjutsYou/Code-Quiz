// Global Variables
var currentQuestionIndex = 0;
var time = 60;
var timerInterval;

// DOM Elements
var startButtonEl = document.getElementById("start-button");
var questionEl = document.getElementById("question");
var answerChoicesEl = document.getElementById("answer-choices");
var timerEl = document.getElementById("timer");
var gameOverEl = document.getElementById("game-over");
var initialsInputEl = document.getElementById("initials-input");
var saveButtonEl = document.getElementById("save-button");

// Quiz Questions
var questions = [
    {
      question: "What does CSS stand for?",
      choices: ["Cascading Style Sheets", "Central Style System", "Creative Styling Solutions", "Computer Styling Standards"],
      answer: "Cascading Style Sheets"
    },
    {
      question: "What is the purpose of JavaScript?",
      choices: ["To add styling to web pages", "To create server-side databases", "To add interactivity to web pages", "To design user interfaces"],
      answer: "To add interactivity to web pages"
    },
    {
      question: "What is the correct syntax for a JavaScript comment?",
      choices: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "## This is a comment"],
      answer: "// This is a comment"
    },
    {
      question: "What is an array in JavaScript?",
      choices: ["A type of loop", "A function", "A variable", "A collection of values"],
      answer: "A collection of values"
    },
    {
      question: "Which operator is used for strict equality comparison in JavaScript?",
      choices: ["==", "===", "!==", "!="],
      answer: "==="
    },
    {
      question: "What is the purpose of the 'for' loop in JavaScript?",
      choices: ["To define a function", "To add styling to web pages", "To create server-side databases", "To repeat a block of code"],
      answer: "To repeat a block of code"
    },
    {
      question: "What is the correct syntax for a function declaration in JavaScript?",
      choices: ["function myFunction()", "myFunction = function()", "myFunction()", "myFunction: function()"],
      answer: "function myFunction()"
    },
    {
      question: "What is the purpose of 'localStorage' in JavaScript?",
      choices: ["To store variables on the server", "To store variables on the client", "To create animations", "To manipulate images"],
      answer: "To store variables on the client"
    },
    {
      question: "What does the 'getElementById()' method do in JavaScript?",
      choices: ["Changes the color of an element", "Selects an element by its class name", "Selects an element by its tag name", "Selects an element by its ID"],
      answer: "Selects an element by its ID"
    },
    {
      question: "What is the purpose of 'JSON.parse()' in JavaScript?",
      choices: ["To convert a JSON string into a JavaScript object", "To convert a JavaScript object into a JSON string", "To create a new JSON object", "To delete a property from a JSON object"],
      answer: "To convert a JSON string into a JavaScript object"
    }
  ];  

// Event Listeners
startButtonEl.addEventListener("click", startQuiz);
answerChoicesEl.addEventListener("click", checkAnswer);
saveButtonEl.addEventListener("click", saveScore);

// Function to start the quiz
function startQuiz() {
  startButtonEl.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
  showQuestion();
}

// Function to show a question
function showQuestion() {
  var question = questions[currentQuestionIndex];
  questionEl.textContent = question.question;
  answerChoicesEl.innerHTML = "";
  for (var i = 0; i < question.choices.length; i++) {
    var choice = document.createElement("li");
    choice.textContent = question.choices[i];
    answerChoicesEl.appendChild(choice);
  }
}

// Function to check the selected answer
function checkAnswer(event) {
  if (event.target.matches("li")) {
    var selectedAnswer = event.target.textContent;
    var question = questions[currentQuestionIndex];
    if (selectedAnswer === question.answer) {
      // Correct answer
      currentQuestionIndex++;
      if (currentQuestionIndex === questions.length) {
        endQuiz();
      } else {
        showQuestion();
      }
    } else {
      // Incorrect answer
      time -= 10; // Penalty of 10 seconds for incorrect answer
      if (time < 0) {
        time = 0; // Make sure time doesn't go negative
      }
      updateTimer();
    }
  }
}

// Function to end the quiz
function endQuiz() {
  clearInterval(timerInterval);
  timerEl.textContent = "Time's Up!";
  questionEl.textContent = "";
  answerChoicesEl.innerHTML = "";
  gameOverEl.style.display = "block";
}

// Function to update the timer
function updateTimer() {
  time--;
  if (time <= 0) {
    endQuiz();
  } else {
    timerEl.textContent = "Time: " + time + " seconds";
  }
}

// Function to save initials and score
function saveScore() {
  var initials = initialsInputEl.value;
  // Save initials and score logic here
}
