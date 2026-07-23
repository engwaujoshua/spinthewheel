const applauseSound = document.getElementById("applauseSound");
const winnerMessage = document.getElementById("winnerMessage");
const winnerText = document.getElementById("winnerText");
const removeWinnerBtn = document.getElementById("removeWinnerBtn");

let lastWinnerIndex = -1;

function showWinner(index) {

    lastWinnerIndex = index;

    winnerText.textContent = `Winner: ${wheelOptions[index]}`;

    winnerMessage.classList.add("show");

    applauseSound.currentTime = 0;
    applauseSound.play().catch(() => {});
}

removeWinnerBtn.addEventListener("click", () => {

    if (lastWinnerIndex === -1) return;

    wheelOptions.splice(lastWinnerIndex, 1);

    renderOptions();

    winnerMessage.classList.remove("show");

    lastWinnerIndex = -1;
});