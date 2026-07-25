const wheelSection = document.querySelector(".wheel-section");
const overlay = document.getElementById("wheelOverlay");

const enlargeBtn = document.getElementById("enlargeBtn");
const newWheelBtn = document.getElementById("newWheelBtn");


/* -------------------------
   TAB SWITCHING
-------------------------- */

const navLinks = document.querySelectorAll(".nav-link");
const tabContents = document.querySelectorAll(".tab-content");

navLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const targetTab = link.dataset.tab;

        navLinks.forEach(nav => {
            nav.classList.remove("active");
        });

        tabContents.forEach(tab => {
            tab.classList.remove("active");
        });

        link.classList.add("active");

        const activeTab = document.getElementById(targetTab);

        if (activeTab) {
            activeTab.classList.add("active");
        }

        if (typeof drawWheel === "function") {
            drawWheel();
        }

        if (typeof updateSharePanel === "function") {
            updateSharePanel();
        }

    });

});

let enlarged = false;

/* -------------------------
   ENLARGE
-------------------------- */

enlargeBtn.addEventListener("click",()=>{

    enlarged=!enlarged;

    wheelSection.classList.toggle("enlarged",enlarged);

    overlay.classList.toggle("show",enlarged);

    enlargeBtn.textContent=enlarged
        ? "Shrink"
        : "Enlarge";

    drawWheel();

});

overlay.addEventListener("click",()=>{

    enlarged=false;

    overlay.classList.remove("show");

    wheelSection.classList.remove("enlarged");

    enlargeBtn.textContent="Enlarge";

    drawWheel();

});

/* -------------------------
   NEW WHEEL
-------------------------- */

newWheelBtn.addEventListener("click",()=>{

    if(!confirm("Start a new wheel?")) return;

    wheelOptions.length=0;

    rotation=0;

    renderOptions();

});

/* -------------------------
   FAQ
-------------------------- */

fetch("data/faq.json")
.then(r=>r.json())
.then(data=>{

    const faq=document.getElementById("faqContainer");

    if(!faq) return;

    faq.innerHTML="";

    data.forEach(item=>{

        faq.innerHTML+=`
            <div class="faq-item">
                <h3>${item.question}</h3>
                <p>${item.answer}</p>
            </div>
        `;

    });

});

/* -------------------------
   TAB SYNC
-------------------------- */

function syncAllTabs(){

    if(typeof updateSharePanel==="function"){
        updateSharePanel();
    }

    if(typeof drawWheel==="function"){
        drawWheel();
    }

}

document.querySelectorAll(".nav-link").forEach(link=>{

    link.addEventListener("click",()=>{

        setTimeout(syncAllTabs,10);

    });

});