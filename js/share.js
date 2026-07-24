const shareOptions = document.getElementById("shareOptions");

const copyLinkBtn = document.getElementById("copyLinkBtn");
const copyOptionsBtn = document.getElementById("copyOptionsBtn");
const downloadImageBtn = document.getElementById("downloadImageBtn");
const shareWhatsappBtn = document.getElementById("shareWhatsappBtn");
const shareTwitterBtn = document.getElementById("shareTwitterBtn");
const shareFacebookBtn = document.getElementById("shareFacebookBtn");

const previewCanvas = document.getElementById("shareWheelPreview");
const previewCtx = previewCanvas.getContext("2d");

function updateSharePanel() {

    shareOptions.value = wheelOptions
    .map(option => option.text)
    .join("\n");

    if (typeof drawWheel === "function") {
        previewCtx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
        previewCtx.drawImage(
            document.getElementById("wheelCanvas"),
            0,
            0,
            previewCanvas.width,
            previewCanvas.height
        );
    }

}

const originalRenderOptions = renderOptions;

renderOptions = function () {
    originalRenderOptions();
    updateSharePanel();
};

updateSharePanel();

copyOptionsBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(
    wheelOptions.map(option => option.text).join("\n")
);
    alert("Options copied.");
});

copyLinkBtn.addEventListener("click", async () => {
    await navigator.clipboard.writeText(window.location.href);
    alert("Page link copied.");
});

downloadImageBtn.addEventListener("click", () => {

    const link = document.createElement("a");

    link.download = "spin-wheel.png";
    link.href = document.getElementById("wheelCanvas").toDataURL("image/png");

    link.click();

});

shareWhatsappBtn.addEventListener("click", () => {

    const text = encodeURIComponent(
        "Try my Spin the Wheel!\n\n" +
        wheelOptions.map(option => option.text).join(", ")
    );

    window.open(`https://wa.me/?text=${text}`, "_blank");

});

shareTwitterBtn.addEventListener("click", () => {

    const text = encodeURIComponent(
        "Try my Spin the Wheel! " +
        wheelOptions.map(option => option.text).join(", ")
    );

    window.open(`https://twitter.com/intent/tweet?text=${text}`, "_blank");

});

shareFacebookBtn.addEventListener("click", () => {

    const url = encodeURIComponent(window.location.href);

    window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        "_blank"
    );

});

window.updateSharePanel = updateSharePanel;