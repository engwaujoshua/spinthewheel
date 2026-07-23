const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

const wheelColors = [
    "#EF4444",
    "#F97316",
    "#EAB308",
    "#22C55E",
    "#06B6D4",
    "#3B82F6",
    "#8B5CF6",
    "#EC4899",
    "#14B8A6",
    "#F43F5E",
    "#84CC16",
    "#6366F1"
];

let rotation = 0;

function drawWheel() {

    const size = canvas.width;
    const radius = size / 2;

    ctx.clearRect(0, 0, size, size);

    if (wheelOptions.length === 0) {

        ctx.beginPath();
        ctx.arc(radius, radius, radius - 2, 0, Math.PI * 2);
        ctx.fillStyle = "#eeeeee";
        ctx.fill();

        return;
    }

    const sliceAngle = (Math.PI * 2) / wheelOptions.length;

    ctx.save();

    ctx.translate(radius, radius);
    ctx.rotate(rotation);

    for (let i = 0; i < wheelOptions.length; i++) {

        const start = i * sliceAngle;
        const end = start + sliceAngle;

        // Slice
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius - 2, start, end);
        ctx.closePath();

        ctx.fillStyle = customWheelColor || wheelColors[i % wheelColors.length];
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.save();

        ctx.rotate(start + sliceAngle / 2);

        ctx.textAlign = "right";
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 18px Arial";

        ctx.fillText(
            wheelOptions[i],
            radius - 25,
            6
        );

        ctx.restore();
    }

    ctx.restore();

    // Center circle
    ctx.beginPath();
    ctx.arc(radius, radius, 28, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 3;
    ctx.stroke();
}

drawWheel();