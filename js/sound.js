const applauseSound = document.getElementById("applauseSound");
const winnerMessage = document.getElementById("winnerMessage");
const winnerText = document.getElementById("winnerText");
const removeWinnerBtn = document.getElementById("removeWinnerBtn");

let lastWinnerId = null;

function showWinner(index) {

    const winner = wheelOptions[index];

    if (!winner) return;

    lastWinnerId = winner.id;

    winnerText.textContent = `Winner: ${winner.text}`;

    winnerMessage.classList.add("show");

    applauseSound.currentTime = 0;

    applauseSound.play().catch(() => {});

}

removeWinnerBtn.addEventListener("click", () => {

    if (lastWinnerId === null) return;

    const index = wheelOptions.findIndex(
        option => option.id === lastWinnerId
    );

    if (index !== -1) {

        wheelOptions.splice(index, 1);

        renderOptions();

    }

    winnerMessage.classList.remove("show");

    lastWinnerId = null;

});