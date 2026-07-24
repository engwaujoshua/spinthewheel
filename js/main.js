document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll(".nav-link");
    const tabContents = document.querySelectorAll(".tab-content");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetTab = link.dataset.tab;

            // Remove active classes
            navLinks.forEach(item => item.classList.remove("active"));
            tabContents.forEach(tab => tab.classList.remove("active"));

            // Activate selected tab
            link.classList.add("active");

            const selectedTab = document.getElementById(targetTab);

            if (selectedTab) {
                selectedTab.classList.add("active");
            }
        });
    });
});


const newWheelBtn = document.getElementById("newWheelBtn");

newWheelBtn.addEventListener("click", () => {

    if (!confirm("Start a new wheel? This will remove all current options.")) {
        return;
    }

    wheelOptions.length = 0;

    if (typeof renderOptions === "function") {
        renderOptions();
    }

    rotation = 0;

    if (typeof drawWheel === "function") {
        drawWheel();
    }

    if (typeof winnerMessage !== "undefined") {
        winnerMessage.classList.remove("show");
    }

    if (typeof lastWinnerIndex !== "undefined") {
        lastWinnerIndex = -1;
    }

});


fetch("data/faq.json")
    .then(response => response.json())
    .then(faqs => {

        const container = document.getElementById("faqContainer");

        if (!container) return;

        faqs.forEach(faq => {

            const item = document.createElement("div");
            item.className = "faq-item";

            item.innerHTML = `
                <h3>${faq.question}</h3>
                <p>${faq.answer}</p>
            `;

            container.appendChild(item);

        });

    })
    .catch(error => console.error(error));

    function syncAllTabs() {

    if (typeof updateSharePanel === "function") {
        updateSharePanel();
    }

    if (typeof drawWheel === "function") {
        drawWheel();
    }

}

document.querySelectorAll(".nav-link").forEach(link => {

    link.addEventListener("click", () => {

        setTimeout(syncAllTabs, 10);

    });

});


const enlargeBtn = document.getElementById("enlargeBtn");
const wheelModal = document.getElementById("wheelModal");
const closeWheelModal = document.getElementById("closeWheelModal");
const modalWheelCanvas = document.getElementById("modalWheelCanvas");

enlargeBtn.addEventListener("click", () => {

    wheelModal.classList.add("show");

    drawWheelOnCanvas(
        modalWheelCanvas,
        rotation
    );

});

closeWheelModal.addEventListener("click", () => {

    wheelModal.classList.remove("show");

});

wheelModal.addEventListener("click", (e) => {

    if (e.target === wheelModal) {
        wheelModal.classList.remove("show");
    }

});