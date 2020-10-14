let startQuiz = document.getElementById("startQuiz");

const timer = 60;

let globeVars = {
    secondsRemaining: timer,
    currentQuestion: 0,
    timeRemainCallBack: null,
};

let questions = [
    {
        questionText: "An array index starts with what number?",
        rightAnswer: 1,
        possible_answers: ['0', '1', '2', '3'],
    },
    {
        questionText: "Choose the item that is NOT a programming language.",
        rightAnswer: 3,
        possible_answers: ["Python", "Java", "Pringles", "Go"],
    },
    {
        questionText: "Who invented Python",
        rightAnswer: 1,
        possible_answers: ["Guido van Rossum", "Steve Angello", "Harry Potter", "Vint Cerf",],
    },
];

document.getElementById("option1").addEventListener("click", option1);
document.getElementById("option2").addEventListener("click", option2);
document.getElementById("option3").addEventListener("click", option3);
document.getElementById("option4").addEventListener("click", option4);
document.getElementById("saveScore").addEventListener("click", saveScore);

startQuiz.addEventListener("click", startQuizClicked);

window.onload = function () {
    controller("intro");
};

function controller(newPageType) {
    document.getElementById("intro").style.display =
        newPageType == "intro" ? "BLOCK" : "NONE";
    document.getElementById("quizBox").style.display =
        newPageType == "quizBox" ? "BLOCK" : "NONE";
    document.getElementById("scoreBox").style.display =
        newPageType == "scoreBox" ? "BLOCK" : "NONE";
}

function startQuizClicked(e) {
    e.preventDefault();
    controller("quizBox");
    showQuestion(0);
    globeVars.secondsRemaining = timer;
    globeVars.timeRemainCallBack = setInterval(function () {
        globeVars.secondsRemaining =
            globeVars.secondsRemaining - 1;
        document.getElementById("secondsText").textContent =
            globeVars.secondsRemaining;
        if (globeVars.secondsRemaining == 0) {
            clearInterval(globeVars.timeRemainCallBack);
            controller("scoreBox");
        }
    }, 1000);
}

function showQuestion(questionIndex) {
    globeVars.currentQuestion = questionIndex;

    if (globeVars.currentQuestion === questions.length) {
        controller("scoreBox");
        quizDone();
        return;
    }

    let question = questions[questionIndex];
    document.getElementById("questionText").textContent = question.questionText;
    document.getElementById("option1").textContent = question.possible_answers[0];
    document.getElementById("option2").textContent = question.possible_answers[1];
    document.getElementById("option3").textContent = question.possible_answers[2];
    document.getElementById("option4").textContent = question.possible_answers[3];
    clearAnswerBox();
}

function optionClicked(answer) {
    if (questions[globeVars.currentQuestion].rightAnswer == answer) {
        showCorrect();
        setTimeout(function () {
            showQuestion(globeVars.currentQuestion + 1);
        }, 700);
    } else {
        showWrong();
        globeVars.secondsRemaining =
            globeVars.secondsRemaining - 10;
        setTimeout(function () {
            showQuestion(globeVars.currentQuestion + 1);
        }, 700);
    }
}

function showCorrect() {
    document.getElementById("feedback").textContent = "Correct!";
}

function showWrong() {
    document.getElementById("feedback").textContent =
        "Wrong!";
}

function clearAnswerBox() {
    document.getElementById("feedback").textContent = " ";
}

function option1(e) {
    e.preventDefault();
    optionClicked(1);
}

function option2(e) {
    e.preventDefault();
    optionClicked(2);
}

function option3(e) {
    e.preventDefault();
    optionClicked(3);
}

function option4(e) {
    e.preventDefault();
    optionClicked(4);
}

function saveScore() {
    let initialsEle = document.getElementById("initialsInput").value;
    let scoreEle = globeVars.secondsRemaining;
    let highScoreRecord = { initials: initialsEle, score: scoreEle };
    console.log(highScoreRecord);

    let highScores = [];
    let highScoresAsString = localStorage.getItem("highscores");
    if (highScoresAsString != null) {
        highScores = JSON.parse(highScoresAsString);
    }

    highScores.push(highScoreRecord);
    console.log(highScores);

    localStorage.setItem("highscores", JSON.stringify(highScores));
    controller("intro");
}

function quizDone() {
    clearInterval(globeVars.timeRemainCallBack);
    let currentScore = globeVars.secondsRemaining;
    console.log(currentScore);
    document.getElementById("currentScoreDisplayBox").textContent = currentScore;
}