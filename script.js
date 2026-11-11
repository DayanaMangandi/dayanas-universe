
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
   ENGLISH / SPANISH LANGUAGE SWITCH
========================= */
(function () {
    const languageButton = document.getElementById("languageToggle");
    const languageButtonText = document.getElementById("languageToggleText");
    if (!languageButton || !languageButtonText) return;

    const spanishText = [
        [".status", ['<span class="status-dot"></span>PORTAFOLIO CREATIVO']],
        [".profile-info p", ["✧ DESARROLLADORA CREATIVA Y DISEÑADORA ✧"]],
        [".profile-info span", ["Tus ideas merecen un poco de magia.", "Bienvenido/a a mi universo"]],
        [".planet-label", ["SOBRE MÍ", "MIS HABILIDADES", "MIS PROYECTOS", "ESTUDIO CREATIVO", "CONTACTO"]],
        [".home-footer", ["HECHO CON 💜 POR DAYANA NICOLE"]],
        ["#backButton", ["← VOLVER AL UNIVERSO"]],
        ["#about .eyebrow", ["CONÓCEME"]],
        ["#about h2", ["MI <span>HISTORIA</span>"]],
        ["#about .about-text h3", ["¿Por qué la tecnología?"]],
        ["#about .about-text p", [
            "Siempre he sentido curiosidad por cómo funcionan las cosas y por cómo la creatividad puede convertir ideas sencillas en algo significativo. Con el tiempo, descubrí que la tecnología es mucho más que computadoras y pantallas: es una forma de expresarte, explorar posibilidades y crear cosas que pueden marcar la diferencia.",
            "Mi interés por la tecnología nace de la oportunidad de combinar creatividad e innovación. Disfruto descubrir cómo se construyen los sitios web, experimentar con el diseño digital y aprender cómo distintas herramientas pueden dar vida a una idea. Lo que más me inspira es que la tecnología me permite transformar mi imaginación en algo real.",
            "Todavía estoy aprendiendo y descubriendo las áreas de la tecnología que más disfruto, pero cada nueva experiencia me motiva a seguir creciendo. Mi objetivo es desarrollar mis habilidades, tener más confianza en lo que creo y utilizar la tecnología como una herramienta para compartir mis ideas con el mundo. ¡Este es solo el comienzo de mi camino!"
        ]],
        ["#skills .eyebrow", ["LO QUE PUEDO HACER"]],
        ["#skills h2", ["MIS <span>HABILIDADES</span>"]],
        [".skill-card h3", ["Desarrollo web", "Edición de video", "Diseño gráfico"]],
        [".skill-card > p", ["HTML · CSS · JavaScript", "Edición · Transiciones · Narrativa", "Composición · Creatividad · Diseño visual"]],
        [".skill-projects-label", ["PROYECTOS", "PROYECTOS", "PROYECTOS"]],
        [".skill-card li", ["DevBoost", "Señora Sakura", "Linguavision AI", "Entrevista", "Acción de Gracias", "Ediciones de K-pop", "Diseños en Canva", "Ediciones en ibis Paint", "Composiciones digitales de K-pop"]],
        ["#projects .eyebrow", ["MI TRABAJO DIGITAL"]],
        ["#projects h2", ["MIS <span>PROYECTOS</span>"]],
        ["#projects .project-video-link", ["VER VIDEO ↗", "VER VIDEO ↗", "VER VIDEO ↗"]],
        ["#projects .repository-pending", ["REPOSITORIO", "REPOSITORIO", "REPOSITORIO"]],
        ["#projects .project-grid h3", ["DevBoost", "Señora Sakura 🌸", "Linguavision AI"]],
        ["#projects .project-details-link", ["EXPLORAR PROYECTO ↗", "EXPLORAR PROYECTO ↗", "EXPLORAR PROYECTO ↗"]],
        ["#projects .project-grid p", [
            "Mi primer proyecto de desarrollo web.",
            "Señora Sakura es una propuesta de sitio web para una cafetería de inspiración asiática en El Salvador. Combina la estética japonesa con un ambiente moderno y acogedor. El sitio presenta el concepto, el menú y el estilo único de la cafetería, creando un espacio donde la cultura asiática, los postres y la creatividad se unen.",
            "Linguavision AI es un sitio web innovador que utiliza inteligencia artificial y visión por computadora para reconocer objetos cotidianos mediante una cámara y ayudar a aprender sus nombres en diferentes idiomas. También incluye audio de pronunciación para hacer el aprendizaje más interactivo, práctico y accesible."
        ]],
        ["#projects .project-category", ["DESARROLLO WEB · PLATAFORMA DIGITAL", "DISEÑO WEB · CONCEPTO DE CAFETERÍA", "INTELIGENCIA ARTIFICIAL · EDUCACIÓN"]],
        ["#projects .project-badge", ["DESARROLLO WEB", "MARCA Y CONCEPTO WEB", "IA Y APRENDIZAJE DE IDIOMAS"]],
        ["#projects .project-info p", [
            "DevBoost es un proyecto de desarrollo web creado para explorar cómo las herramientas digitales pueden convertir ideas en experiencias en línea útiles y atractivas.",
            "Señora Sakura es una propuesta de sitio web para una cafetería de inspiración asiática en El Salvador. Combina la estética japonesa con un ambiente moderno y acogedor, y presenta el concepto, el menú y el estilo único de la cafetería.",
            "Linguavision AI utiliza inteligencia artificial y visión por computadora para reconocer objetos cotidianos mediante una cámara y ayudar a aprender sus nombres en diferentes idiomas. El audio de pronunciación hace que la práctica de vocabulario sea más interactiva y accesible."
        ]],
        ["#projects .project-actions .project-link", ["EXPLORAR PROYECTO ↗", "EXPLORAR PROYECTO ↗", "EXPLORAR PROYECTO ↗"]],
        ["#projects .project-demo-link", ["▶ VER DEMOSTRACIÓN", "▶ VER DEMOSTRACIÓN", "▶ VER DEMOSTRACIÓN"]],
        ["#studio .eyebrow", ["MI MUNDO CREATIVO"]],
        ["#studio h2", ["ESTUDIO <span>CREATIVO</span>"]],
        [".studio-intro p", ["Un espacio donde la creatividad se une con la narrativa. Explora mis videos, ediciones de K-pop y diseños digitales."]],
        [".studio-filters .filter-btn", ["TODO MI TRABAJO", "VIDEOS", "CANVA", "IBIS PAINT"]],
        [".studio-card .studio-tag", ["PRODUCCIÓN DE VIDEO", "PRODUCCIÓN DE VIDEO", "EDICIÓN DE VIDEO", "IBIS PAINT", "IBIS PAINT", "IBIS PAINT", "IBIS PAINT", "IBIS PAINT", "IBIS PAINT", "IBIS PAINT", "IBIS PAINT", "IBIS PAINT", "DISEÑO EN CANVA", "DISEÑO EN CANVA", "DISEÑO EN CANVA", "DISEÑO EN CANVA"]],
        [".studio-card h3", ["Entrevista", "Acción de Gracias", "Ediciones de K-pop", "Edición Suzaizai", "Dahyun", "Rosé y Jennie", "Rosé", "J-Hope", "Morado", "J-Hope y Rosé", "Tres cabezas", "Rosa", "Rosé Amarillo", "Hanni", "Yves", "Rei"]],
        [".studio-card p", [
            "Un proyecto audiovisual enfocado en la comunicación, la narrativa y la expresión creativa.",
            "Un video especial que captura recuerdos, experiencias y momentos inolvidables.",
            "Ediciones de video creativas inspiradas en el K-pop, la música y la narrativa visual.",
            "Una composición digital creativa realizada con ibis Paint.",
            "Una edición digital que explora los colores y la composición visual.",
            "Una edición inspirada en el K-pop con Rosé y Jennie.",
            "Una edición creativa de retrato inspirada en Rosé.",
            "Una composición digital inspirada en J-Hope.",
            "Una creación digital con temática morada.",
            "Una edición creativa que reúne a dos artistas musicales.",
            "Una composición experimental con un estilo visual único.",
            "Un diseño en tonos rosados con una estética divertida.",
            "Una composición visual que combina colores, creatividad y diseño digital.",
            "Un diseño creativo inspirado en Hanni.",
            "Una composición digital creada con Canva.",
            "Un diseño visual creativo inspirado en Rei."
        ]],
        ["#studio .hire-card h3", ["¿Tienes un proyecto en mente?"]],
        ["#studio .hire-card p", ["¡Démosle vida a tus ideas!"]],
        ["#studio .hire-card button", ["TRABAJEMOS JUNTOS ✦"]],
        ["#contact .eyebrow", ["CONECTEMOS"]],
        ["#contact h2", ["CONTÁCT<span>AME</span>"]],
        ["#contact .glass-card h3", ["¡Creemos algo increíble!"]],
        ["#contact .contact-intro", ["¿Te interesa mi trabajo o quieres colaborar? Me encantaría conocer tus ideas."]],
        ["#contact .contact-note", ["Se abrirá tu aplicación de correo para que puedas enviar tu mensaje."]],
        [".contact-action-button", ["CONTACTAR POR CORREO ↗", "VISITAR MI GITHUB ↗"]],
        ["#contact .contact-submit", ["Enviar mensaje"]],
        ["#contact .linkedin-button", ["VISITAR MI LINKEDIN ↗"]],
        [".cv-kicker", ["✦ MI PERFIL PROFESIONAL", "MÁS ALLÁ DE LA TECNOLOGÍA"]],
        [".cv-copy h3", ["MI <span>CURRÍCULUM</span>"]],
        [".cv-copy p", ["Explora mi formación académica, habilidades, certificaciones y experiencias en un solo lugar."]],
        [".cv-view", ["VER MI CV ↗"]],
        [".cv-download", ["DESCARGAR CV ↓"]],
        [".volunteering-section h3", ["MI <span>CAMINO EN EL VOLUNTARIADO</span>"]],
        [".volunteering-intro", ["Experiencias que me han permitido contribuir, conectar con otras personas y generar un impacto positivo."]],
        [".volunteer-number", ["EXPERIENCIA 01", "EXPERIENCIA 02"]],
        [".volunteer-card-copy h4", ["Voluntariado en un orfanato", "Voluntariado en un hogar de ancianos"]],
        [".volunteer-card-copy p", [
            "Participé en una actividad de voluntariado en un orfanato, donde compartí tiempo con niños, viví momentos alegres y ayudé a crear un ambiente positivo. Esta experiencia fortaleció mi sentido de responsabilidad, amabilidad y compromiso social. Me recordó el valor de apoyar a los demás y generar un impacto positivo en nuestra comunidad.",
            "Tuve la oportunidad de realizar voluntariado en un hogar de ancianos, donde compartí tiempo con adultos mayores, viví momentos significativos y ofrecí compañía. Esta experiencia me enseñó la importancia de la empatía, el respeto, la paciencia y el cuidado de los demás. Me recordó que incluso los pequeños actos de bondad pueden marcar una gran diferencia."
        ]],
        [".projects-intro", ["Una pequeña vista previa de cada idea. Abre un proyecto para explorar su historia, video y detalles."]],
        [".cover-number", ["01 / DESARROLLO WEB", "02 / DISEÑO WEB", "03 / INTELIGENCIA ARTIFICIAL"]],
        [".cover-open", ["VER DETALLES ↗", "VER DETALLES ↗", "VER DETALLES ↗"]],
        [".section-footer", ["✦ CADA PROYECTO ES UNA NUEVA ESTRELLA ✦"]]
    ];

    // Keep the original English content so switching languages never reloads
    // the page or loses the current screen/scroll position.
    const originalContent = new Map();
    spanishText.forEach(([selector]) => {
        document.querySelectorAll(selector).forEach(element => {
            if (!originalContent.has(element)) {
                originalContent.set(element, element.innerHTML);
            }
        });
    });

    const originalPlaceholders = {};
    ["contactName", "contactEmail", "contactMessage"].forEach(id => {
        const element = document.getElementById(id);
        if (element) originalPlaceholders[id] = element.placeholder;
    });

    const originalButtonText = languageButtonText.textContent;
    const originalTitle = document.title;

    function setLanguage(language) {
        const isSpanish = language === "es";
        document.documentElement.lang = isSpanish ? "es" : "en";

        if (isSpanish) {
            spanishText.forEach(([selector, values]) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((element, index) => {
                    if (values[index] !== undefined) {
                        element.innerHTML = values[index];
                    }
                });
            });

            const contactName = document.getElementById("contactName");
            const contactEmail = document.getElementById("contactEmail");
            const contactMessage = document.getElementById("contactMessage");
            if (contactName) contactName.placeholder = "Tu nombre";
            if (contactEmail) contactEmail.placeholder = "Tu correo electrónico";
            if (contactMessage) contactMessage.placeholder = "Tu mensaje";

            languageButtonText.textContent = "ENGLISH";
            languageButton.setAttribute("aria-label", "Switch website to English");
            document.title = "Dayana's Universe | Portafolio Creativo";
        } else {
            originalContent.forEach((html, element) => {
                element.innerHTML = html;
            });

            Object.entries(originalPlaceholders).forEach(([id, placeholder]) => {
                const element = document.getElementById(id);
                if (element) element.placeholder = placeholder;
            });

            languageButtonText.textContent = originalButtonText;
            languageButton.setAttribute("aria-label", "Switch website to Spanish");
            document.title = originalTitle;
        }

        languageButton.dataset.language = language;
        languageButton.setAttribute("aria-pressed", String(isSpanish));
    }

    languageButton.dataset.language = "en";
    languageButton.setAttribute("aria-pressed", "false");

    languageButton.addEventListener("click", function () {
        const currentLanguage = languageButton.dataset.language || "en";
        setLanguage(currentLanguage === "en" ? "es" : "en");
    });

    // Restore the projects section when returning from a project detail page.
    const requestedSection = window.location.hash.slice(1);
    const requestedElement = requestedSection ? document.getElementById(requestedSection) : null;
    if (requestedElement && requestedElement.classList.contains("content-section")) {
        openSection(requestedSection);
    }
})();


/* CONTACT FORM: OPEN A PRE-FILLED EMAIL */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const message = document.getElementById("contactMessage").value.trim();

        const subject = encodeURIComponent("Portfolio contact from " + name);
        const body = encodeURIComponent(
            "Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + message
        );

        window.location.href =
            "mailto:dayana.torres2026@adoc.superate.org?subject=" + subject + "&body=" + body;
    });
}

