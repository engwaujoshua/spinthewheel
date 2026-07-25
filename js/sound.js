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

    applauseSound.pause();
    applauseSound.currentTime = 0;

    // Start almost silent
    applauseSound.volume = 0.05;

    applauseSound.play().catch(() => {});

    // Fade in to 35% volume
    const targetVolume = 0.35;
    const fadeDuration = 1200;
    const stepTime = 50;
    const step = targetVolume / (fadeDuration / stepTime);

    const fade = setInterval(() => {

        if (applauseSound.volume >= targetVolume) {
            applauseSound.volume = targetVolume;
            clearInterval(fade);
            return;
        }

        applauseSound.volume = Math.min(
            applauseSound.volume + step,
            targetVolume
        );

    }, stepTime);

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