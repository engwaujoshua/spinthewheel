const copyLinkBtn = document.getElementById("copyLinkBtn");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const shareWhatsappBtn = document.getElementById("shareWhatsappBtn");
const shareTwitterBtn = document.getElementById("shareTwitterBtn");
const shareFacebookBtn = document.getElementById("shareFacebookBtn");

const previewCanvas = document.getElementById("shareWheelPreview");
const previewCtx = previewCanvas.getContext("2d");

function updateSharePanel() {

    if (!shareOptions) return;

    const wheelCanvas = document.getElementById("wheelCanvas");

    if (
        !wheelCanvas ||
        wheelCanvas.width === 0 ||
        wheelCanvas.height === 0
    ) {
        return;
    }

    previewCtx.clearRect(
        0,
        0,
        previewCanvas.width,
        previewCanvas.height
    );

    previewCtx.drawImage(
        wheelCanvas,
        0,
        0,
        previewCanvas.width,
        previewCanvas.height
    );

}

window.updateSharePanel = updateSharePanel;

window.addEventListener("load", () => {

    updateSharePanel();

});

const originalRenderOptions = renderOptions;

renderOptions = function () {

    originalRenderOptions();

    updateSharePanel();

};


copyLinkBtn.addEventListener("click", async () => {

    await navigator.clipboard.writeText(window.location.href);

    alert("Page link copied.");

});

downloadImageBtn.addEventListener("click", () => {

    const wheelCanvas = document.getElementById("wheelCanvas");

    if (
        !wheelCanvas ||
        wheelCanvas.width === 0 ||
        wheelCanvas.height === 0
    ) {
        alert("Wheel is not ready yet.");
        return;
    }

    const link = document.createElement("a");

    link.download = "spin-wheel.png";
    link.href = wheelCanvas.toDataURL("image/png");

    link.click();

});

shareWhatsappBtn.addEventListener("click", () => {

    const text = encodeURIComponent(window.location.href);

    window.open(
        `https://wa.me/?text=${text}`,
        "_blank"
    );

});

shareTwitterBtn.addEventListener("click", () => {

    const text = encodeURIComponent(window.location.href);

    window.open(
        `https://twitter.com/intent/tweet?text=${text}`,
        "_blank"
    );

});

shareFacebookBtn.addEventListener("click", () => {

    const url = encodeURIComponent(window.location.href);

    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
    );

});