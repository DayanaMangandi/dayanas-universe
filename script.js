
/* =========================
   CREATE STARS
========================= */

const starsContainer = document.getElementById("stars");

if (starsContainer) {
    for (let i = 0; i < 130; i++) {

        const star = document.createElement("span");

        star.classList.add("star");

        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";

        star.style.animationDelay = Math.random() * 4 + "s";

        const size = Math.random() * 2 + 1;

        star.style.width = size + "px";
        star.style.height = size + "px";

        starsContainer.appendChild(star);
    }
}


/* =========================
   SCREEN ELEMENTS
========================= */

const universe = document.getElementById("universe");
const sectionScreen = document.getElementById("sectionScreen");
const backButton = document.getElementById("backButton");


/* =========================
   OPEN A SECTION
========================= */

function openSection(pageName) {

    const selectedSection = document.getElementById(pageName);

    if (!selectedSection) return;

    universe.classList.remove("active");
    sectionScreen.classList.add("active");

    const sections = document.querySelectorAll(".content-section");

    sections.forEach(function(section) {
        section.classList.remove("active");
    });

    selectedSection.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================
   PLANET INTERACTIONS
========================= */

const planets = document.querySelectorAll("[data-page]");

planets.forEach(function(planet) {

    planet.addEventListener("click", function() {

        const pageName = planet.dataset.page;

        openSection(pageName);

    });

});


/* =========================
   RETURN TO UNIVERSE
========================= */

function goHome() {

    sectionScreen.classList.remove("active");
    universe.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}

if (backButton) {
    backButton.addEventListener("click", goHome);
}


/* =========================
   HOME LOGO
========================= */

document.querySelectorAll("[data-home]").forEach(function(link) {

    link.addEventListener("click", function(event) {

        event.preventDefault();
        goHome();

    });

});


/* =========================
   ROCKET CURSOR SYSTEM
========================= */

const rocketCursor = document.getElementById("rocket-cursor");

const desktopCursor = window.matchMedia(
    "(hover: hover) and (pointer: fine)"
).matches;

if (rocketCursor && desktopCursor) {

    let lastSparkTime = 0;

    // FOLLOW THE MOUSE
    window.addEventListener("pointermove", function(event) {

        rocketCursor.style.left = event.clientX + "px";
        rocketCursor.style.top = event.clientY + "px";

        rocketCursor.classList.add("visible");

        // CREATE PURPLE STARS
        const now = performance.now();

        if (now - lastSparkTime > 45) {

            lastSparkTime = now;

            const spark = document.createElement("span");

            spark.classList.add("cursor-star");

            spark.textContent =
                Math.random() > 0.5 ? "✦" : "✧";

            spark.style.left =
                (event.clientX + 10 + Math.random() * 15) + "px";

            spark.style.top =
                (event.clientY + 10 + Math.random() * 15) + "px";

            spark.style.setProperty(
                "--drift-x",
                (Math.random() * 40 - 20) + "px"
            );

            spark.style.setProperty(
                "--drift-y",
                (Math.random() * 40 - 20) + "px"
            );

            document.body.appendChild(spark);

            setTimeout(function() {
                spark.remove();
            }, 700);

        }

    });

    // HOVER EFFECT
    document.querySelectorAll("button, a").forEach(function(element) {

        element.addEventListener("pointerenter", function() {
            rocketCursor.classList.add("is-hovering");
        });

        element.addEventListener("pointerleave", function() {
            rocketCursor.classList.remove("is-hovering");
        });

    });

    // HIDE WHEN MOUSE LEAVES THE PAGE
    document.addEventListener("pointerleave", function() {
        rocketCursor.classList.remove("visible");
    });

    document.addEventListener("pointerenter", function() {
        rocketCursor.classList.add("visible");
    });

}


/* =========================
   CREATIVE STUDIO FILTERS
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const studioCards = document.querySelectorAll(".studio-card");


/* =========================
   GOOGLE DRIVE LINK
========================= */

const allWorkFolder =
    "https://drive.google.com/drive/folders/1vX4mnFpDfglFJhLRC2KRTc6-YTq8QA9k";


/* =========================
   REMOVE OLD CARD LINKS
========================= */

studioCards.forEach(card => {

    card.querySelectorAll(".drive-link, .project-link").forEach(link => {
        link.remove();
    });

});


/* =========================
   ALL MY FULL PROJECTS BUTTON
========================= */

const studioGallery = document.querySelector("#studio .studio-gallery");
const hireCard = document.querySelector("#studio .hire-card");

if (studioGallery && hireCard) {

    // Avoid duplicate buttons
    const oldButton = document.querySelector(".all-work-link");

    if (oldButton) {
        oldButton.remove();
    }

    const allWorkLink = document.createElement("a");

    allWorkLink.href = allWorkFolder;
    allWorkLink.target = "_blank";
    allWorkLink.rel = "noopener noreferrer";

    allWorkLink.className = "project-link drive-link all-work-link";

    allWorkLink.textContent = "VIEW ALL MY FULL PROJECTS ↗";

    // Place button between gallery and contact card
    hireCard.parentNode.insertBefore(allWorkLink, hireCard);

}


/* =========================
   FILTER PROJECTS
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const selectedFilter = button.dataset.filter;

        studioCards.forEach(card => {

            const category = card.dataset.category;

            card.hidden = !(
                selectedFilter === "all" ||
                selectedFilter === category
            );

        });

    });

});


/* =========================
   OPTIONAL PROJECT VIDEO LINKS
   Add a URL to data-video-url on a .project-grid .glass-card
   to display its "WATCH PROJECT VIDEO" link automatically.
========================= */
document.querySelectorAll("#projects .project-grid > .glass-card").forEach(card => {
    const videoUrl = (card.dataset.videoUrl || "").trim();
    if (!videoUrl) return;

    try {
        const parsedUrl = new URL(videoUrl);
        if (parsedUrl.protocol !== "https:" && parsedUrl.protocol !== "http:") return;

        const videoLink = document.createElement("a");
        videoLink.className = "project-video-link";
        videoLink.href = parsedUrl.href;
        videoLink.target = "_blank";
        videoLink.rel = "noopener noreferrer";
        videoLink.textContent = "WATCH PROJECT VIDEO ↗";
        card.appendChild(videoLink);
    } catch (error) {
        console.warn("Invalid project video URL:", videoUrl);
    }
});
