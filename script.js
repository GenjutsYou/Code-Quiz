// Global Variables
var currentQuestionIndex = 0;
var time = 60;
var timerInterval;
var score = 0;
var highscores = [];

// DOM Elements
var startButtonEl = document.getElementById("start-button");
var questionEl = document.getElementById("question");
var answerChoicesEl = document.getElementById("answer-choices");
var timerEl = document.getElementById("timer");
var gameOverEl = document.getElementById("game-over");
var initialsInputEl = document.getElementById("initials-input");
var saveButtonEl = document.getElementById("save-button");
var scoreEl = document.getElementById("score");
var scoreDisplayEl = document.getElementById("scoreValue");
var highscoreBtnEl = document.getElementById("highscore-btn");

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

// Get highscores from local storage
getHighscores()

// Event Listeners
startButtonEl.addEventListener("click", startQuiz);
answerChoicesEl.addEventListener("click", checkAnswer);
saveButtonEl.addEventListener("click", submitScore);
highscoreBtnEl.addEventListener("click", viewHighscores);


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

// Function to update the timer
function updateTimer() {
  time--;
  if (time <= 0) {
    endQuiz();
  } else {
    timerEl.textContent = "Time: " + time + " seconds";
  }
}

// Function to check the selected answer
function checkAnswer(event) {
  if (event.target.matches("li")) {
    var selectedAnswer = event.target.textContent;
    var question = questions[currentQuestionIndex];
    if (selectedAnswer === question.answer) {
      // Correct answer
      score += 10; // Add 10 points for correct answer
      updateScoreDisplay()
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
      currentQuestionIndex++; // Move to the next question
      if (currentQuestionIndex === questions.length) {
        endQuiz();
      } else {
        showQuestion();
      }
    }
  }
}

function endQuiz() {
  clearInterval(timerInterval);
  timerEl.textContent = "Time's Up!";
  questionEl.style.display = "none";
  answerChoicesEl.style.display = "none";
  gameOverEl.style.display = "block";
  startButtonEl.style.display = "none";
}

// Update the score display in your code
function updateScoreDisplay() {
  scoreDisplay.textContent = score;
}

// Function to save initials and score
function saveScore() {
  var initials = initialsInputEl.value.trim();
  if (initials === "") {
    return;
  }
  var newScore = {
    initials: initials,
    score: score
  };
  console.log('newScore', newScore)
  highscores.push(newScore);
  saveHighscores();
  initialsInputEl.value = "";
  // viewHighscores();
}

// Function to save highscores to local storage
function saveHighscores() {
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

// Function to retrieve highscores from local storage
function getHighscores() {
  var storedHighscores = localStorage.getItem("highscores");
  if (storedHighscores) {
    highscores = JSON.parse(storedHighscores);
  }
}

// Create a submit button and append it to the HTML
  var submitBtn = document.createElement("button");
  submitBtn.textContent = "Submit";
  submitBtn.addEventListener("click", saveScore);
  initialsInputEl.parentNode.insertBefore(submitBtn, initialsInputEl.nextSibling);

// Function to view high scores
function viewHighscores() {
  startButtonEl.style.display = "none";
  questionEl.style.display = "none";
  answerChoicesEl.style.display = "none";
  gameOverEl.style.display = "none";
  initialsInputEl.style.display = "none";
  saveButtonEl.style.display = "none";
  scoreEl.style.display = "block"; // Show the high scores
  
  // Retrieve highscores from local storage
  var storedHighscores = localStorage.getItem("highscores");
  if (storedHighscores) {
    scoreDisplay.innerHTML = ""; // Clear the existing high scores
    for (var i = 0; i < highscores.length; i++) {
      var scoreEntry = document.createElement("li");
      scoreEntry.textContent = highscores[i].initials + ": " + highscores[i].score;
      scoreDisplay.appendChild(scoreEntry);
    }
  }
  
  highscoreBtnEl.disabled = true;
}

function submitScore() {
  var initials = initialsInputEl.value.trim();
  if (initials === "") {
    return;
  }
  var newScore = {
    initials: initials,
    score: score
  };
  highscores.push(newScore);
  saveHighscores();
  initialsInputEl.value = "";
  viewHighscores();
}


