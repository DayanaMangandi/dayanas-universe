const projectDetails = {
  "devboost": {
    title: "DevBoost",
    category: "WEB DEVELOPMENT · DIGITAL PLATFORM",
    description: "DevBoost was my first web development project. It helped me explore how websites are structured and how design and code work together to create useful digital experiences. This project represents an important step in my learning journey.",
    descriptionEs: "DevBoost fue mi primer proyecto de desarrollo web. Me permitió explorar cómo se estructuran los sitios web y cómo el diseño y el código trabajan juntos para crear experiencias digitales útiles. Este proyecto representa un paso importante en mi camino de aprendizaje.",
    image: "images/projects/devboost.png",
    video: "https://res.cloudinary.com/wt6ih2pg/video/upload/v1794354714/MicrosoftTeams-video_1.mp4",
    website: "https://devboost.infinityfreeapp.com/",
    technologies: ["HTML", "CSS", "JavaScript", "Web Development"]
  },
  "senora-sakura": {
    title: "Señora Sakura 🌸",
    category: "WEB DESIGN · CAFÉ CONCEPT",
    description: "Señora Sakura is a website proposal for an Asian-inspired café in El Salvador. It combines Japanese aesthetics with a modern and welcoming atmosphere. The website presents the café concept, menu and visual identity, creating a space where Asian culture, desserts and creativity come together.",
    descriptionEs: "Señora Sakura es una propuesta de sitio web para una cafetería de inspiración asiática en El Salvador. Combina la estética japonesa con un ambiente moderno y acogedor. El sitio presenta el concepto, el menú y la identidad visual de la cafetería, creando un espacio donde la cultura asiática, los postres y la creatividad se unen.",
    image: "images/projects/senora-sakura.png",
    video: "https://res.cloudinary.com/wt6ih2pg/video/upload/v1794354706/MicrosoftTeams-video.mp4",
    website: "https://emelymarroquin2026.github.io/Propuesta-Senora-Sakura/",
    technologies: ["HTML", "CSS", "JavaScript", "Web Design"]
  },
  "linguavision": {
    title: "Linguavision AI",
    category: "ARTIFICIAL INTELLIGENCE · EDUCATION",
    description: "Linguavision AI is an interactive website that uses artificial intelligence and computer vision to recognize everyday objects through a camera and help users learn their names in different languages. It also includes pronunciation audio, making language learning more interactive, practical and accessible.",
    descriptionEs: "Linguavision AI es un sitio web interactivo que utiliza inteligencia artificial y visión por computadora para reconocer objetos cotidianos mediante una cámara y ayudar a aprender sus nombres en diferentes idiomas. También incluye audio de pronunciación, haciendo que el aprendizaje sea más interactivo, práctico y accesible.",
    image: "images/projects/linguavision-ai.png",
    video: "https://res.cloudinary.com/wt6ih2pg/video/upload/v1794355831/WhatsApp_Video_2026-11-10_at_11.33.49_AM.mp4",
    website: "https://emelymarroquin2026.github.io/Linguavision/",
    technologies: ["Artificial Intelligence", "Computer Vision", "JavaScript", "Education"]
  }
};
const params = new URLSearchParams(window.location.search);
const key = params.get("project");
const project = projectDetails[key];
const root = document.getElementById("projectDetailContent");
const languageButton = document.getElementById("languageToggle");
const languageButtonText = document.getElementById("languageToggleText");
const backLink = document.querySelector(".project-detail-back");
let currentLanguage = "en";

const categoryEs = {
  "devboost": "DESARROLLO WEB · PLATAFORMA DIGITAL",
  "senora-sakura": "DISEÑO WEB · CONCEPTO DE CAFETERÍA",
  "linguavision": "INTELIGENCIA ARTIFICIAL · EDUCACIÓN"
};

function renderProjectDetails() {
  const isSpanish = currentLanguage === "es";

  if (!project) {
    root.innerHTML = `
      <section class="project-detail-panel project-detail-content">
        <h1>${isSpanish ? "Proyecto no encontrado" : "Project not found"}</h1>
        <a class="project-detail-back" href="index.html#projects">${isSpanish ? "Volver a proyectos" : "Back to projects"}</a>
      </section>`;
    document.title = isSpanish ? "Proyecto no encontrado | Dayana's Universe" : "Project not found | Dayana's Universe";
    return;
  }

  const description = isSpanish && project.descriptionEs ? project.descriptionEs : project.description;
  const category = isSpanish ? categoryEs[key] : project.category;

  root.innerHTML = `
    <article class="project-detail-panel">
      <div class="project-detail-hero">
        <img src="${project.image}" alt="${project.title} preview" onerror="this.style.display='none';this.parentElement.classList.add('image-placeholder')">
      </div>
      <div class="project-detail-content">
        <span class="project-category">${category}</span>
        <h1>${project.title}</h1>
        <p class="project-detail-description">${description}</p>
        <div class="project-detail-meta">${project.technologies.map(item => `<span>${item}</span>`).join("")}</div>
        <h2>${isSpanish ? "VIDEO DEL PROYECTO" : "PROJECT VIDEO"}</h2>
        <video class="project-detail-video" controls playsinline preload="metadata">
          <source src="${project.video}" type="video/mp4">
          ${isSpanish ? "Tu navegador no admite la reproducción de video." : "Your browser does not support video playback."}
        </video>
        <div class="project-detail-actions">
          <a href="${project.website}" target="_blank" rel="noopener noreferrer">${isSpanish ? "VISITAR SITIO WEB ↗" : "VISIT WEBSITE ↗"}</a>
          <a href="index.html#projects">${isSpanish ? "VOLVER A PROYECTOS" : "BACK TO PROJECTS"}</a>
        </div>
      </div>
    </article>`;
  document.title = project.title + " | Dayana's Universe";
}

function setLanguage(language) {
  currentLanguage = language;
  const isSpanish = language === "es";
  document.documentElement.lang = language;
  languageButtonText.textContent = isSpanish ? "ENGLISH" : "ESPAÑOL";
  languageButton.setAttribute("aria-label", isSpanish ? "Switch website to English" : "Switch website to Spanish");
  languageButton.setAttribute("aria-pressed", String(isSpanish));
  if (backLink) backLink.textContent = isSpanish ? "← VOLVER A PROYECTOS" : "← BACK TO PROJECTS";
  renderProjectDetails();
}

if (languageButton && languageButtonText) {
  languageButton.addEventListener("click", function () {
    setLanguage(currentLanguage === "en" ? "es" : "en");
  });
}

renderProjectDetails();
