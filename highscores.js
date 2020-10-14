window.onload = function () {
    let highScores = [];
    let highScoreText = localStorage.getItem("highscores");
    if (highScoreText != null) {
        highScores = JSON.parse(highScoreText);
    }

    let highScoreList = document.getElementById("highScoreList");
    highScores.forEach((e) => {
        console.log(e);
        var list = document.createElement("li");
        highScoreList.appendChild(list);
        list.innerText = e.initials + ": " + e.score;
    });
};

document.getElementById("clear").addEventListener("click", clearHighScores);

function clearHighScores() {
    localStorage.removeItem("highscores");
    location.reload();
}