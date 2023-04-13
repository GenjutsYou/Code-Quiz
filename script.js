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
    choices: ["a)Cascading Style Sheets", "b)Central Style System", "c)Creative Styling Solutions", "d)Computer Styling Standards"],
    answer: "a)Cascading Style Sheets"
  },
  {
    question: "What is the purpose of JavaScript?",
    choices: ["a)To add styling to web pages", "b)To create server-side databases", "c)To add interactivity to web pages", "d)To design user interfaces"],
    answer: "c)To add interactivity to web pages"
  },
  {
    question: "What is the purpose of the 'console.log()' function in JavaScript?",
    choices: ["a)To display messages on the web page", "b)To execute a function", "c)To send data to the server", "d)To print output to the console"],
    answer: "d)To print output to the console"
    },
    {
    question: "What does the 'DOCTYPE' declaration in HTML do?",
    choices: ["a)Specifies the character encoding of the document", "b)Defines the version of HTML used", "c)Indicates the type of document being used", "d)Specifies the title of the web page"],
    answer: "c)Indicates the type of document being used"
    },
    {
    question: "What is the correct syntax for creating a new variable in JavaScript?",
    choices: ["a)var newVar = 10;", "b)let newVar = 10;", "c)const newVar = 10;", "d)int newVar = 10;"],
    answer: "b)let newVar = 10;"
    },
    {
    question: "What does the 'margin' property in CSS define?",
    choices: ["a)The space inside an element's border", "b)The space outside an element's border", "c)The width of an element", "d)The height of an element"],
    answer: "b)The space outside an element's border"
    },
    {
    question: "What does the 'addEventListener()' method in JavaScript do?",
    choices: ["a)Changes the background color of an element", "b)Adds an event handler function to an element", "c)Modifies the content of an element", "d)Creates a new HTML element"],
    answer: "b)Adds an event handler function to an element"
    },
    {
    question: "What is the purpose of the 'box-sizing' property in CSS?",
    choices: ["a)Defines the layout of a web page", "b)Specifies the size of an image", "c)Controls the box model of an element", "d)Sets the color of a text"],
    answer: "c)Controls the box model of an element"
    },
    {
    question: "What is the correct way to write a comment in JavaScript?",
    choices: ["a)// This is a comment", "b)<!-- This is a comment -->", "c)/* This is a comment */", "d)<!--! This is a comment -->"],
    answer: "a)// This is a comment"
    },
    {
    question: "What is the purpose of the 'text-align' property in CSS?",
    choices: ["a)Sets the background color of an element", "b)Changes the font size of an element", "c)Defines the alignment of text within an element", "d)Controls the spacing between lines of text"],
    answer: "c)Defines the alignment of text within an element"
    },
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