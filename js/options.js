let nextOptionId = 1;

const defaultColors = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
    "#84cc16"
];

function randomColor() {
    return defaultColors[
        Math.floor(Math.random() * defaultColors.length)
    ];
}

const wheelOptions = [
    {
        id: nextOptionId++,
        text: "Pizza",
        color: randomColor()
    },
    {
        id: nextOptionId++,
        text: "Burger",
        color: randomColor()
    },
    {
        id: nextOptionId++,
        text: "Pasta",
        color: randomColor()
    },
    {
        id: nextOptionId++,
        text: "Tacos",
        color: randomColor()
    }
];

const optionInput = document.getElementById("optionInput");
const newOptionColor = document.getElementById("newOptionColor");
const addOptionBtn = document.getElementById("addOptionBtn");
const optionsList = document.getElementById("optionsList");

function renderOptions() {

    optionsList.innerHTML = "";

    wheelOptions.forEach(option => {

        const row = document.createElement("li");
        row.className = "option-item";

        row.innerHTML = `
            <input
                class="option-text"
                data-id="${option.id}"
                value="${option.text}"
            >

            <input
                type="color"
                class="option-color"
                data-id="${option.id}"
                value="${option.color}"
            >

            <button
                class="delete-option"
                data-id="${option.id}">
                ✕
            </button>
        `;

        optionsList.appendChild(row);

    });

    if (typeof drawWheel === "function") {
        drawWheel();
    }

    if (typeof updateSharePanel === "function") {
        updateSharePanel();
    }

}

function addOption() {

    const text = optionInput.value.trim();

    if (!text) return;

    wheelOptions.push({
        id: nextOptionId++,
        text,
        color: newOptionColor.value || randomColor()
    });

    optionInput.value = "";
    newOptionColor.value = randomColor();

    renderOptions();

}

addOptionBtn.addEventListener("click", addOption);

optionInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {
        addOption();
    }

});

optionsList.addEventListener("input", e => {

    const id = Number(e.target.dataset.id);

    const option = wheelOptions.find(o => o.id === id);

    if (!option) return;

    if (e.target.classList.contains("option-text")) {
        option.text = e.target.value;
    }

    if (e.target.classList.contains("option-color")) {
        option.color = e.target.value;
    }

    if (typeof drawWheel === "function") {
    drawWheel();
}

if (typeof updateSharePanel === "function") {
    updateSharePanel();
}

});

optionsList.addEventListener("click", e => {

    if (!e.target.classList.contains("delete-option")) return;

    const id = Number(e.target.dataset.id);

    const index = wheelOptions.findIndex(o => o.id === id);

    if (index !== -1) {
        wheelOptions.splice(index, 1);
    }

    renderOptions();

});

document.addEventListener("DOMContentLoaded", renderOptions);