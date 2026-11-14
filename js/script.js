// Taha.dev — mobile navigation, project preview modal, and section navigation
"use strict";

const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");
const navLinks = document.querySelectorAll(".nav-link");
const modal = document.getElementById("demoModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalTech = document.getElementById("modalTech");
const demoButtons = document.querySelectorAll(".demo-button");

const projectDetails = {
  automation: {
    title: "Smart Workflow Automation",
    description: "A workflow concept for collecting form submissions, locating or creating a submitter folder, storing uploaded files, updating a spreadsheet, and sending confirmation emails. It demonstrates how connected services can reduce repetitive administrative work.",
    tech: ["n8n", "Webhooks", "Google Drive", "Google Sheets", "Gmail"]
  },
  attendance: {
    title: "AcademiaSync — Attendance Dashboard",
    description: "A responsive university attendance management interface concept designed to make class information, student records, and attendance summaries easier to review. The preview artwork on this portfolio is illustrative.",
    tech: ["HTML5", "CSS3", "JavaScript", "Python", "Responsive UI"]
  },
  password: {
    title: "Smart Password Generator",
    description: "A browser-based password generator concept featuring a length slider, character-set filters, secure random generation with the Web Crypto API, strength feedback, and copy-to-clipboard support.",
    tech: ["JavaScript", "Web Crypto API", "DOM Manipulation", "CSS"]
  },
  restaurant: {
    title: "Olive & Ember — Restaurant Website",
    description: "A modern restaurant website concept with a food menu, category filters, chef story, guest testimonials, responsive navigation, and a front-end reservation request form.",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design"]
  }
};

function closeNav() {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Open navigation");
  navToggle.textContent = "☰";
}

navToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(opened));
  navToggle.setAttribute("aria-label", opened ? "Close navigation" : "Open navigation");
  navToggle.textContent = opened ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => link.addEventListener("click", closeNav));

function openProjectPreview(projectKey) {
  const project = projectDetails[projectKey];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalTech.replaceChildren(...project.tech.map(technology => {
    const tag = document.createElement("span");
    tag.textContent = technology;
    return tag;
  }));
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  modalClose.focus();
}

function closeProjectPreview() {
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

demoButtons.forEach(button => {
  button.addEventListener("click", () => openProjectPreview(button.dataset.demo));
});

modalClose.addEventListener("click", closeProjectPreview);
modal.addEventListener("click", event => {
  if (event.target === modal) closeProjectPreview();
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && modal.classList.contains("open")) closeProjectPreview();
});

// Highlight the navigation item for the section currently in view.
const observedSections = document.querySelectorAll("main section[id]");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
      });
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  observedSections.forEach(section => observer.observe(section));
}
