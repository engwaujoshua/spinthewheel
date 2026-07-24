const wheelColorPicker = document.getElementById("wheelColor");
const spinTimeSlider = document.getElementById("spinTime");
const spinTimeValue = document.getElementById("spinTimeValue");
const presetCards = document.querySelectorAll(".preset-card");

// Used by spin.js
let spinDuration = 5000;

// Used by wheel.js
let customWheelColor = null;

// ----------------------
// Wheel Color
// ----------------------

wheelColorPicker.addEventListener("input", () => {
    customWheelColor = wheelColorPicker.value;

    if (typeof drawWheel === "function") {
        drawWheel();
    }
});

// ----------------------
// Spin Duration
// ----------------------

spinTimeSlider.addEventListener("input", () => {

    spinTimeValue.textContent = spinTimeSlider.value + "s";

    spinDuration = Number(spinTimeSlider.value) * 1000;

});

// ----------------------
// Preset Wheels
// ----------------------

const presets = {

    food: [
        "Pizza",
        "Burger",
        "Pasta",
        "Sushi",
        "Chicken",
        "Fries",
        "Tacos",
        "Rice"
    ],

    movies: [
        "Action",
        "Comedy",
        "Drama",
        "Horror",
        "Sci-Fi",
        "Animation"
    ],

    chores: [
        "Laundry",
        "Wash Dishes",
        "Vacuum",
        "Mop",
        "Take Out Trash",
        "Clean Bathroom"
    ],

    fitness: [
        "Push-ups",
        "Squats",
        "Run",
        "Plank",
        "Burpees",
        "Jump Rope"
    ],

    study: [
        "Math",
        "Science",
        "History",
        "English",
        "Coding",
        "Reading"
    ],

    yesno: [
        "Yes",
        "No"
    ]

};

presetCards.forEach(card => {

    card.addEventListener("click", () => {

        const preset = presets[card.dataset.preset];

        if (!preset) return;

        wheelOptions.length = 0;

        preset.forEach(option => wheelOptions.push(option));

        renderOptions();

    });

});

window.spinDuration = spinDuration;
window.customWheelColor = customWheelColor;