var currentQuestionIndex = 0;


//grab HTML elements
var timeEl = document.querySelector("#time");
var startBtn = document.querySelector("#startButton");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var submitBtn = document.querySelector("#submit-button");
var titleScreen = document.querySelector("#title-section");
var quizScreen = document.querySelector("#quiz-section");
var highScoreScreen = document.querySelector("#highscore-section");
var highScoreDisplay = document.querySelector("#highscore-display-section");


var questionsEl = document.querySelector("#question");
var choicesEl = document.querySelector("#choices");

var time = questions.length * 15;
var timerId;

//start Quiz function
function startQuiz() {
    timerId = setInterval(tick, 1000);
    timeEl.textContent = time;
  
    getQuestion();
  }
  //start timer once quiz is started
  function tick() {
    time--;
    timeEl.textContent = time;

    if (time <= 0) {
      quizEnd();
   }
}

//get next question
function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;
  choicesEl.innerHTML = "";

  currentQuestion.choices.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);
  
    choiceNode.textContent = i + 1 + ". " + choice;
    choiceNode.onclick = questionClick;
    choicesEl.appendChild(choiceNode);
  });
  }
function questionClick() {
  if (this.value !== questions[currentQuestionIndex].answer) {
    // subtract time
    time -= 15;

      if (time < 0) {
        time = 0;
      }
    
      timeEl.textContent = time;
      feedbackEl.textContent = "Wrong!";
    } else {
      feedbackEl.textContent = "Correct!";
    }
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "feedback hide");
    }, 1000);
    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
     getQuestion();
 }
}
// end quiz

function saveHighscore() {
  var initials = initialsEl.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];
    var newScore = {
      score: time,
     initials: initials
  };

  //localstorage
  highscores.push(newScore);
  window.localStorage.setItem("highscores", JSON.stringify(highscores));

  window.location.href = "highScore.html";
  }
}

function quizEnd() {
  
clearInterval(timerId);
  var highscoreSectionEl = document.querySelector("#highscore-section");
  highscoreSectionEl.setAttribute("class", "show");
  var finalScoreEl = document.querySelector("#final-score");
  finalScoreEl.textContent = time;
  quizScreen.setAttribute("class", "hide");
}
function checkForEnter(event) {

  if (event.key === "Enter") {
    saveHighscore();
  }
}



// saving highscore
submitBtn.onclick = saveHighscore;
  
startBtn.onclick = startQuiz;
  
initialsEl.onkeyup = checkForEnter;