const spinButton = document.getElementById("wheelCanvas");

let isSpinning = false;

spinButton.addEventListener("click", spinWheel);

function spinWheel() {

    if (isSpinning) return;
    if (wheelOptions.length < 2) {
        alert("Add at least 2 options.");
        return;
    }

    isSpinning = true;

    const winningIndex = Math.floor(Math.random() * wheelOptions.length);

    const sliceAngle = (Math.PI * 2) / wheelOptions.length;

    // Pointer is at the top (270°)
    const targetAngle =
        (Math.PI * 2 * 6) +
        ((Math.PI * 1.5) - (winningIndex * sliceAngle) - (sliceAngle / 2));

    const startRotation = rotation;
    const duration = spinDuration;

    let startTime = null;

    function animate(timestamp) {

        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Ease out
        const ease = 1 - Math.pow(1 - progress, 3);

        rotation = startRotation + (targetAngle - startRotation) * ease;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {

            rotation = targetAngle % (Math.PI * 2);

            drawWheel();

            isSpinning = false;

            showWinner(winningIndex);
        }
    }

    requestAnimationFrame(animate);
}