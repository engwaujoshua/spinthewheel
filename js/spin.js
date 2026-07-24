const wheelCanvas = document.getElementById("wheelCanvas");

let isSpinning = false;

wheelCanvas.addEventListener("click", spinWheel);

function spinWheel() {

    if (isSpinning) return;

    if (wheelOptions.length < 2) {
        alert("Add at least 2 options.");
        return;
    }

    isSpinning = true;

    const spins = 6;
    const winnerIndex = Math.floor(Math.random() * wheelOptions.length);

    const sliceAngle = (Math.PI * 2) / wheelOptions.length;

    // Pointer is at the top (-90°)
    const targetRotation =
        (spins * Math.PI * 2) +
        (-Math.PI / 2) -
        (winnerIndex * sliceAngle) -
        (sliceAngle / 2);

    const startRotation = rotation;
    const change = targetRotation - startRotation;

    const duration = spinDuration;

    let startTime = null;

    function animate(timestamp) {

        if (!startTime) startTime = timestamp;

        const elapsed = timestamp - startTime;

        const progress = Math.min(elapsed / duration, 1);

        // Ease Out Cubic
        const eased = 1 - Math.pow(1 - progress, 3);

        rotation = startRotation + (change * eased);

        drawWheel();

        if (progress < 1) {

            requestAnimationFrame(animate);

        } else {

            rotation = targetRotation % (Math.PI * 2);

            drawWheel();

            isSpinning = false;

            if (typeof showWinner === "function") {
                showWinner(winnerIndex);
            }

        }

    }

    requestAnimationFrame(animate);

}