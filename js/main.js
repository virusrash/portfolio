/**
 * Application Entry Point
 * M. Sandaru Rashmika — Cyber Security Specialist | Full Stack Developer
 * 
 * Safely renders centralized data from data.js and initializes Three.js, GSAP, and UI interactions.
 */

import { portfolioData } from "./data.js";
import { initThreeScenes } from "./three-scene.js";
import { initAnimations } from "./animations.js";
import { initInteractions } from "./interactions.js";

document.addEventListener("DOMContentLoaded", () => {
  renderCentralizedContent();
  initThreeScenes();
  initInteractions();
  initAnimations();
});

/**
 * Render all content dynamically from portfolioData
 */
function renderCentralizedContent() {
  renderHeroStats();
  renderProjectsSection();
  renderMarquee();
  renderAwards();
  renderBeforeAfter();
  renderSecuritySection();
  renderTechStackSection();
  renderItOpsSection();
  renderAboutSection();
  renderToolkitSection();
  renderProcessSection();
  renderContactSection();
  renderFooter();
}

/**
 * 1. Hero Expertise Highlights & CV Configuration
 */
function renderHeroStats() {
  const container = document.getElementById("heroExpertiseList");
  if (!container) return;

  container.innerHTML = portfolioData.expertiseHighlights.map(item => `
    <div class="stat-item">
      <div class="stat-item-label">${escapeHtml(item.label)}</div>
      <div class="stat-item-desc">${escapeHtml(item.desc)}</div>
    </div>
  `).join("");

  // CV Button: Show only if real CV is configured
  const cvContainer = document.getElementById("heroCvContainer");
  const cvBtn = document.getElementById("heroCvBtn");
  if (portfolioData.personal.cv && portfolioData.personal.cv.trim() !== "") {
    cvBtn.setAttribute("href", portfolioData.personal.cv);
    cvContainer.style.display = "block";
  } else {
    cvContainer.style.display = "none";
  }
}

/**
 * 2. Dynamic Projects Showcase & Category Filtering
 */
function renderProjectsSection() {
  const filtersContainer = document.getElementById("projectFilters");
  const gridContainer = document.getElementById("projectsGrid");
  if (!filtersContainer || !gridContainer) return;

  // Extract unique categories dynamically
  const uniqueCategories = [
    "ALL",
    ...new Set(portfolioData.projects.map(p => p.category.toUpperCase()))
  ];

  // Render Filter Pills
  filtersContainer.innerHTML = uniqueCategories.map((cat, idx) => `
    <button 
      class="filter-btn ${idx === 0 ? "active" : ""}" 
      data-filter="${cat === "ALL" ? "all" : cat.toLowerCase()}"
      role="tab"
      aria-selected="${idx === 0 ? "true" : "false"}"
    >
      ${escapeHtml(cat)}
    </button>
  `).join("");

  // Render Project Cards Function
  const renderCards = (filterCategory = "all") => {
    const filtered = filterCategory === "all"
      ? portfolioData.projects
      : portfolioData.projects.filter(p => p.category.toLowerCase() === filterCategory.toLowerCase());

    gridContainer.innerHTML = filtered.map((proj, idx) => {
      const formattedIndex = String(idx + 1).padStart(2, "0");
      return `
        <article class="project-card" data-category="${proj.category.toLowerCase()}">
          <div class="project-thumb-wrap">
            <img src="${escapeHtml(proj.thumbnail)}" alt="${escapeHtml(proj.title)}" class="project-thumb-img" loading="lazy">
            <span class="project-index-badge">${formattedIndex}</span>
          </div>

          <div class="project-content">
            <div class="project-meta-top">
              <span class="project-category">${escapeHtml(proj.category)}</span>
              <span class="project-year">${escapeHtml(proj.year)}</span>
            </div>

            <h3 class="project-title">${escapeHtml(proj.title)}</h3>
            <p class="project-desc">${escapeHtml(proj.description)}</p>

            <div class="project-tech-tags">
              ${proj.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("")}
            </div>

            <div class="project-actions">
              <button class="btn-case-study" onclick="openCaseStudy('${proj.id}')" aria-label="Open case study for ${escapeHtml(proj.title)}">
                <span>CASE STUDY</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>

              <div class="project-links">
                <a href="${escapeHtml(proj.github || portfolioData.social.github)}" target="_blank" rel="noopener noreferrer" class="p-icon-link" aria-label="GitHub Repository">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </article>
      `;
    }).join("");
  };

  renderCards("all");

  // Filter Buttons Interaction
  filtersContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;

    filtersContainer.querySelectorAll(".filter-btn").forEach(b => {
      b.classList.remove("active");
      b.setAttribute("aria-selected", "false");
    });

    btn.classList.add("active");
    btn.setAttribute("aria-selected", "true");

    const category = btn.getAttribute("data-filter");
    renderCards(category);
  });
}

/**
 * 2b. Infinite Marquee ("Been part of the bigger picture")
 */
function renderMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track || !portfolioData.marquee) return;

  const repeated = [...portfolioData.marquee, ...portfolioData.marquee];
  track.innerHTML = repeated.map(brand => `
    <span class="marquee-item">
      <span>${escapeHtml(brand)}</span>
      <span class="marquee-dot">✦</span>
    </span>
  `).join("");
}

/**
 * 2c. Awards and Technical Recognition
 */
function renderAwards() {
  const container = document.getElementById("awardsList");
  if (!container || !portfolioData.awards) return;

  container.innerHTML = portfolioData.awards.map(award => `
    <div class="award-item-row">
      <div class="award-meta">
        <h3 class="award-title-text">${escapeHtml(award.title)}</h3>
        <span class="award-issuer-text">${escapeHtml(award.issuer)} • ${escapeHtml(award.category)}</span>
      </div>
      <span class="award-year-tag">${escapeHtml(award.year)}</span>
    </div>
  `).join("");
}

/**
 * 2d. Interactive Before & After System Hardening
 */
function renderBeforeAfter() {
  const beforeText = document.getElementById("baBeforeText");
  const afterText = document.getElementById("baAfterText");
  const caption = document.getElementById("baCaption");
  const baData = portfolioData.beforeAfter;

  if (!baData) return;
  if (beforeText) beforeText.textContent = baData.beforeText;
  if (afterText) afterText.textContent = baData.afterText;
  if (caption) {
    caption.innerHTML = `
      <span>${escapeHtml(baData.title)}</span>
      <span>${escapeHtml(baData.tools)}</span>
    `;
  }
}

/**
 * 3. Security Competencies List
 */
function renderSecuritySection() {
  const container = document.getElementById("securityCompetenciesList");
  if (!container) return;

  container.innerHTML = portfolioData.securitySkills.map(item => `
    <div class="comp-card">
      <div class="comp-code">${escapeHtml(item.code)}</div>
      <div class="comp-body">
        <h3 class="comp-title">${escapeHtml(item.title)}</h3>
        <p class="comp-desc">${escapeHtml(item.desc)}</p>
      </div>
    </div>
  `).join("");
}

/**
 * 4. Full Stack Development Showcase
 */
function renderTechStackSection() {
  const container = document.getElementById("techStackShowcase");
  if (!container) return;

  const stack = portfolioData.techStack;
  const categories = [
    { title: "Languages", key: "languages", badge: "CORE SYNTAX" },
    { title: "Frontend Engineering", key: "frontend", badge: "REACTIVE UI" },
    { title: "Backend & APIs", key: "backend", badge: "SERVICES" },
    { title: "Database Systems", key: "databases", badge: "DATA PERSISTENCE" }
  ];

  container.innerHTML = categories.map(cat => `
    <div class="tech-cat-card">
      <div class="tech-cat-header">
        <h3 class="tech-cat-title">${escapeHtml(cat.title)}</h3>
        <span class="tech-cat-badge">${escapeHtml(cat.badge)}</span>
      </div>
      <div class="tech-pill-list">
        ${stack[cat.key].map(tech => `<span class="tech-pill">${escapeHtml(tech)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

/**
 * 5. IT Operations Section
 */
function renderItOpsSection() {
  const container = document.getElementById("itopsGrid");
  if (!container) return;

  container.innerHTML = portfolioData.itOperations.map(item => `
    <div class="itops-card">
      <h3 class="itops-title">${escapeHtml(item.title)}</h3>
      <p class="itops-desc">${escapeHtml(item.desc)}</p>
    </div>
  `).join("");
}

/**
 * 6. About Section: Verified Biography & Education
 */
function renderAboutSection() {
  const bioContainer = document.getElementById("aboutBioParagraphs");
  if (bioContainer) {
    bioContainer.innerHTML = portfolioData.personal.fullBio.map(para => `
      <p class="bio-p">${escapeHtml(para)}</p>
    `).join("");
  }
}

/**
 * 7. Technical Toolkit Responsive Grid
 */
function renderToolkitSection() {
  const container = document.getElementById("toolkitGrid");
  if (!container) return;

  const allTools = [
    ...portfolioData.techStack.languages.map(t => ({ name: t, cat: "LANGUAGE" })),
    ...portfolioData.techStack.frontend.map(t => ({ name: t, cat: "FRONTEND" })),
    ...portfolioData.techStack.backend.map(t => ({ name: t, cat: "BACKEND" })),
    ...portfolioData.techStack.databases.map(t => ({ name: t, cat: "DATABASE" })),
    ...portfolioData.techStack.tools.map(t => ({ name: t, cat: "TOOL / OPS" }))
  ];

  container.innerHTML = allTools.map(item => `
    <div class="toolkit-item">
      <span class="toolkit-item-cat">${escapeHtml(item.cat)}</span>
      <span class="toolkit-item-title">${escapeHtml(item.name)}</span>
    </div>
  `).join("");
}

/**
 * 8. Development Process Steps
 */
function renderProcessSection() {
  const container = document.getElementById("processStepsList");
  if (!container) return;

  container.innerHTML = portfolioData.approachSteps.map(step => `
    <div class="process-step-item">
      <div class="step-marker-node">${escapeHtml(step.step)}</div>
      <h3 class="step-title">${escapeHtml(step.title)}</h3>
      <p class="step-desc">${escapeHtml(step.desc)}</p>
    </div>
  `).join("");
}

/**
 * 9. Contact Section Social Pills
 */
function renderContactSection() {
  const pillsContainer = document.getElementById("contactSocialPills");
  if (!pillsContainer) return;

  const socials = [
    { label: "GITHUB", url: portfolioData.social.github },
    { label: "LINKEDIN", url: portfolioData.social.linkedin },
    { label: "FACEBOOK", url: portfolioData.social.facebook }
  ].filter(s => s.url && s.url.trim() !== "");

  pillsContainer.innerHTML = socials.map(s => `
    <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="social-pill">
      ${escapeHtml(s.label)} ↗
    </a>
  `).join("");
}

/**
 * 10. Footer Social Links & Current Year
 */
function renderFooter() {
  const footerSocial = document.getElementById("footerSocialList");
  const mobileSocials = document.getElementById("mobileSocials");
  const yearEl = document.getElementById("currentYear");

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const socials = [
    { label: "GitHub (@virusrash)", url: portfolioData.social.github },
    { label: "LinkedIn", url: portfolioData.social.linkedin },
    { label: "Facebook", url: portfolioData.social.facebook }
  ].filter(s => s.url && s.url.trim() !== "");

  const socialLinksHtml = socials.map(s => `
    <a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer" class="footer-social-link">
      <span>${escapeHtml(s.label)}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
    </a>
  `).join("");

  if (footerSocial) footerSocial.innerHTML = socialLinksHtml;
  if (mobileSocials) mobileSocials.innerHTML = socialLinksHtml;
}

/**
 * HTML Sanitizer Helper
 */
function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

