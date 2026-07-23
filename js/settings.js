const darkModeToggle = document.getElementById("darkModeToggle");
const signInBtn = document.getElementById("signInBtn");
const signOutBtn = document.getElementById("signOutBtn");

// Restore theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
    darkModeToggle.checked = true;
}

// Dark mode toggle
darkModeToggle.addEventListener("change", () => {

    if (darkModeToggle.checked) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }

});

// Placeholder account buttons
signInBtn.addEventListener("click", () => {
    alert("Sign In will be added later.");
});

signOutBtn.addEventListener("click", () => {
    alert("Sign Out will be added later.");
});