const canvas = document.getElementById("wheelCanvas");
const ctx = canvas.getContext("2d");

let rotation = 0;

function resizeWheelCanvas() {

    const displaySize = Math.min(
        canvas.parentElement.clientWidth,
        500
    );

    canvas.width = displaySize;
    canvas.height = displaySize;

}

function drawWheel() {

    resizeWheelCanvas();

    const width = canvas.width;
    const height = canvas.height;

    const cx = width / 2;
    const cy = height / 2;

    // Leave room so nothing gets clipped
    const radius = Math.min(width, height) / 2 - 8;

    ctx.clearRect(0, 0, width, height);

    if (wheelOptions.length === 0) {

        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fillStyle = "#eeeeee";
        ctx.fill();

        return;
    }

    const anglePerSlice = (Math.PI * 2) / wheelOptions.length;

    ctx.save();

    ctx.translate(cx, cy);
    ctx.rotate(rotation);

    wheelOptions.forEach((option, index) => {

        const startAngle = index * anglePerSlice;
        const endAngle = startAngle + anglePerSlice;

        // Slice
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(
            0,
            0,
            radius,
            startAngle,
            endAngle
        );
        ctx.closePath();

        ctx.fillStyle = option.color;
        ctx.fill();

        ctx.strokeStyle = "#ffffff";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Text
        ctx.save();

        ctx.rotate(startAngle + anglePerSlice / 2);

        ctx.textAlign = "right";
        ctx.textBaseline = "middle";

        let fontSize = 20;

        if (wheelOptions.length > 10) fontSize = 16;
        if (wheelOptions.length > 16) fontSize = 13;

        ctx.font = `bold ${fontSize}px Arial`;
        ctx.fillStyle = "#ffffff";

        ctx.fillText(
            option.text,
            radius - 18,
            0
        );

        ctx.restore();

    });

    ctx.restore();

    // Center hub
    ctx.beginPath();
    ctx.arc(cx, cy, 26, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.fill();

    ctx.lineWidth = 3;
    ctx.strokeStyle = "#cccccc";
    ctx.stroke();

}

window.addEventListener("resize", drawWheel);

document.addEventListener("DOMContentLoaded", drawWheel);


function drawWheelOnCanvas(targetCanvas, targetRotation = rotation) {

    const context = targetCanvas.getContext("2d");

    const width = targetCanvas.width;
    const height = targetCanvas.height;

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - 8;

    context.clearRect(0, 0, width, height);

    if (!wheelOptions.length) return;

    const sliceAngle = (Math.PI * 2) / wheelOptions.length;

    context.save();

    context.translate(cx, cy);
    context.rotate(targetRotation);

    wheelOptions.forEach((option, index) => {

        const start = index * sliceAngle;
        const end = start + sliceAngle;

        context.beginPath();
        context.moveTo(0,0);
        context.arc(0,0,radius,start,end);
        context.closePath();

        context.fillStyle = option.color;
        context.fill();

        context.strokeStyle = "#fff";
        context.lineWidth = 2;
        context.stroke();

        context.save();

        context.rotate(start + sliceAngle / 2);

        context.textAlign = "right";
        context.textBaseline = "middle";
        context.fillStyle = "#fff";
        context.font = "bold 28px Arial";

        context.fillText(
            option.text,
            radius - 25,
            0
        );

        context.restore();

    });

    context.restore();

    context.beginPath();
    context.arc(cx,cy,40,0,Math.PI*2);
    context.fillStyle="#fff";
    context.fill();
}