const wheelOptions = [
    "Pizza",
    "Burger",
    "Pasta",
    "Tacos"
];

const optionInput = document.getElementById("optionInput");
const addOptionBtn = document.getElementById("addOptionBtn");
const optionsList = document.getElementById("optionsList");

function renderOptions() {
    optionsList.innerHTML = "";

    wheelOptions.forEach((option, index) => {
        const li = document.createElement("li");
        li.className = "option-item";

        li.innerHTML = `
            <input
                type="text"
                class="option-text"
                value="${option}"
                data-index="${index}"
            >

            <button
                class="delete-option"
                data-index="${index}">
                ✕
            </button>
        `;

        optionsList.appendChild(li);
    });

    if (typeof drawWheel === "function") {
        drawWheel();
    }
}

function addOption() {
    const value = optionInput.value.trim();

    if (value === "") return;

    wheelOptions.push(value);

    optionInput.value = "";

    renderOptions();
}

addOptionBtn.addEventListener("click", addOption);

optionInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        addOption();
    }
});

optionsList.addEventListener("input", (e) => {
    if (!e.target.classList.contains("option-text")) return;

    const index = Number(e.target.dataset.index);

    wheelOptions[index] = e.target.value;
    if (typeof drawWheel === "function") {
        drawWheel();
    }
});

optionsList.addEventListener("click", (e) => {
    if (!e.target.classList.contains("delete-option")) return;

    const index = Number(e.target.dataset.index);

    wheelOptions.splice(index, 1);

    renderOptions();
});

renderOptions();