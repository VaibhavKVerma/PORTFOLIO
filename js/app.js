import {
  profile,
  skills,
  projects,
  experience,
  education,
} from "./data.js";

const sections = [
  { id: "about", label: "About" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const pages = ["home", ...sections.map((item) => item.id)];
const labels = {
  home: "Home",
  about: "About",
  projects: "Work",
  experience: "Experience",
  skills: "Skills",
  education: "Education",
  contact: "Contact",
};

const stills = {
  home: "images/vox-home.jpg",
  about: "images/vox-home.jpg",
  projects: "images/vox-work.jpg",
  experience: "images/vox-experience.jpg",
  skills: "images/vox-skills.jpg",
  education: "images/vox-education.jpg",
  contact: "images/vox-contact.jpg",
};

const hero = document.getElementById("hero");
const sheet = document.getElementById("sheet");
const sheetBody = document.getElementById("sheet-body");
const sheetKicker = document.getElementById("sheet-kicker");
const dock = document.getElementById("dock");
const hint = document.getElementById("hint");
const step = document.getElementById("step");
const burger = document.getElementById("nav-burger");
const mobileMenu = document.getElementById("mobile-menu");
const stageA = document.getElementById("stage-a");
const stageB = document.getElementById("stage-b");

Object.values(stills).forEach((src) => {
  const img = new Image();
  img.src = src;
});

let front = stageA;
let back = stageB;
let currentStill = stills.home;

function setStill(id) {
  const src = stills[id] || stills.home;
  if (src === currentStill) return;
  currentStill = src;
  back.src = src;
  back.classList.add("is-on");
  front.classList.remove("is-on");
  const swap = front;
  front = back;
  back = swap;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function tags(list) {
  return `<div class="tags">${list
    .map((item) => `<span class="tag">${escapeHtml(item)}</span>`)
    .join("")}</div>`;
}

const views = {
  about: {
    kicker: "01  /  About",
    html: `
      <div class="about-row">
        <img src="${profile.photo}" alt="${escapeHtml(profile.name)}" />
        <div>
          <h2>${escapeHtml(profile.name)}</h2>
          <p class="muted">${escapeHtml(profile.role)} · ${escapeHtml(profile.company)} · NIT Jalandhar</p>
        </div>
      </div>
      ${profile.about.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
    `,
  },
  projects: {
    kicker: "02  /  Work",
    html: `
      <h2>Selected work</h2>
      <p>Backend systems from GitHub — click a card to open the repo.</p>
      ${projects
        .map(
          (item) => `
        <a class="card" href="${item.url}" target="_blank" rel="noreferrer">
          <h3>${escapeHtml(item.name)}</h3>
          <p>${escapeHtml(item.summary)}</p>
          ${tags(item.stack)}
        </a>`
        )
        .join("")}
    `,
  },
  experience: {
    kicker: "03  /  Experience",
    html: `
      <h2>Work history</h2>
      ${experience
        .map((job) => {
          const lead = job.points.slice(0, 2);
          const rest = job.points.slice(2);
          return `
        <article class="job">
          <div class="job-top">
            <h3>${escapeHtml(job.company)}</h3>
            <span class="job-dates">${escapeHtml(job.dates)}</span>
          </div>
          <p class="job-role">${escapeHtml(job.role)}${job.location ? ` · ${escapeHtml(job.location)}` : ""}</p>
          <ul>${lead.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>
          ${
            rest.length
              ? `<details class="more"><summary>More</summary><ul>${rest
                  .map((p) => `<li>${escapeHtml(p)}</li>`)
                  .join("")}</ul></details>`
              : ""
          }
          ${tags(job.tags)}
        </article>`;
        })
        .join("")}
    `,
  },
  skills: {
    kicker: "04  /  Skills",
    html: `
      <h2>What I ship with</h2>
      ${skills
        .map(
          (skill) => `
        <div class="skill">
          <div class="skill-row">
            <strong>${escapeHtml(skill.title)}</strong>
            <span>${escapeHtml(skill.name)}</span>
          </div>
          ${skill.value ? `<div class="bar"><i style="--w:${skill.value}%"></i></div>` : ""}
        </div>`
        )
        .join("")}
    `,
  },
  education: {
    kicker: "05  /  Education",
    html: `
      <h2>Education</h2>
      ${education
        .map(
          (item) => `
        <article class="job">
          <h3>${escapeHtml(item.title)}</h3>
          <p class="job-role">${escapeHtml(item.place)}${item.dates ? ` · ${escapeHtml(item.dates)}` : ""}</p>
          ${item.points.length ? `<ul>${item.points.map((p) => `<li>${escapeHtml(p)}</li>`).join("")}</ul>` : ""}
          ${tags(item.tags)}
        </article>`
        )
        .join("")}
    `,
  },
  contact: {
    kicker: "06  /  Contact",
    html: `
      <h2>Get in touch</h2>
      <p>A role, a build, or just hello — I read everything.</p>
      <a class="mail" href="mailto:${profile.email}">${escapeHtml(profile.email)}</a>
      <p><a href="tel:${profile.phone}">${escapeHtml(profile.phone)}</a></p>
      <div class="socials">
        <a href="${profile.links.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="${profile.links.github}" target="_blank" rel="noreferrer">GitHub</a>
        <a href="${profile.links.leetcode}" target="_blank" rel="noreferrer">LeetCode</a>
        <a href="${profile.links.codeforces}" target="_blank" rel="noreferrer">Codeforces</a>
      </div>
    `,
  },
};

sections.forEach((def) => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.to = def.id;
  button.textContent = def.label;
  button.addEventListener("click", () => goTo(def.id));
  dock.append(button);
});

let current = "";
let locked = false;
let acc = 0;
let hintHidden = false;

function goTo(id, quiet = false) {
  if (!pages.includes(id)) return;
  showPage(id);
  const url = id === "home" ? location.pathname + location.search : `#${id}`;
  history.replaceState(null, "", url);
  closeMobile();
  if (!quiet && !hintHidden) {
    hintHidden = true;
    hint.classList.add("is-gone");
  }
}

function showPage(id) {
  if (id === current) return;
  current = id;
  const isHome = id === "home";
  hero.classList.toggle("is-dim", !isHome);
  document.body.classList.toggle("is-open", !isHome);
  setStill(id);
  step.textContent = labels[id] || id;

  document.querySelectorAll("[data-to]").forEach((link) => {
    link.classList.toggle("is-active", link.getAttribute("data-to") === id);
  });

  if (isHome) {
    sheet.classList.remove("is-open");
    sheet.setAttribute("aria-hidden", "true");
    return;
  }

  const view = views[id];
  if (!view) return;
  sheetKicker.textContent = view.kicker;
  sheetBody.innerHTML = view.html;
  sheetBody.scrollTop = 0;
  sheet.classList.add("is-open");
  sheet.setAttribute("aria-hidden", "false");
}

function stepPage(dir) {
  if (locked) return;
  const index = pages.indexOf(current);
  const next = pages[Math.max(0, Math.min(pages.length - 1, index + dir))];
  if (next === current) return;
  locked = true;
  goTo(next);
  window.setTimeout(() => {
    locked = false;
    acc = 0;
  }, 720);
}

function sheetOwnsWheel(event) {
  if (!sheet.classList.contains("is-open")) return false;
  if (!sheet.contains(event.target)) return false;
  const dy = event.deltaY;
  const atTop = sheetBody.scrollTop <= 0;
  const atBottom = sheetBody.scrollTop + sheetBody.clientHeight >= sheetBody.scrollHeight - 2;
  if (dy < 0 && !atTop) return true;
  if (dy > 0 && !atBottom) return true;
  return false;
}

window.addEventListener(
  "wheel",
  (event) => {
    if (sheetOwnsWheel(event)) return;
    event.preventDefault();
    acc += event.deltaY;
    if (Math.abs(acc) < 70) return;
    stepPage(acc > 0 ? 1 : -1);
  },
  { passive: false }
);

let touchY = null;
window.addEventListener(
  "touchstart",
  (event) => {
    if (sheet.classList.contains("is-open") && sheet.contains(event.target)) return;
    touchY = event.touches[0].clientY;
  },
  { passive: true }
);
window.addEventListener(
  "touchend",
  (event) => {
    if (touchY == null) return;
    const dy = touchY - event.changedTouches[0].clientY;
    touchY = null;
    if (Math.abs(dy) < 48) return;
    stepPage(dy > 0 ? 1 : -1);
  },
  { passive: true }
);

function closeMobile() {
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  mobileMenu.hidden = true;
}

document.querySelectorAll("[data-to]").forEach((node) => {
  node.addEventListener("click", (event) => {
    event.preventDefault();
    goTo(node.getAttribute("data-to"));
  });
});

document.getElementById("sheet-close").addEventListener("click", () => goTo("home"));

burger.addEventListener("click", () => {
  const open = !burger.classList.contains("is-open");
  burger.classList.toggle("is-open", open);
  burger.setAttribute("aria-expanded", String(open));
  mobileMenu.hidden = !open;
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") goTo("home");
  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
    event.preventDefault();
    stepPage(1);
  }
  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
    event.preventDefault();
    stepPage(-1);
  }
});

const startId = window.location.hash.replace("#", "") || "home";
goTo(startId === "intro" ? "about" : startId, true);
