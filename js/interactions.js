/**
 * Interactive Controls & User Experience Logic
 * Custom cursor, magnetic buttons, modal dialogs, category filtering, contact validation.
 */

import { portfolioData } from "./data.js";

export function initInteractions() {
  initCustomCursor();
  initStickyHeader();
  initMobileMenu();
  initMagneticButtons();
  initCaseStudyModal();
  initVideoModal();
  initBeforeAfterSlider();
  initContactForm();
  initBackToTop();
}

/**
 * 1. Premium Custom Cursor System
 */
function initCustomCursor() {
  const dot = document.getElementById("cursorDot");
  const outline = document.getElementById("cursorOutline");
  if (!dot || !outline) return;

  // Check touch / pointer
  if (window.matchMedia("(pointer: coarse)").matches) {
    dot.style.display = "none";
    outline.style.display = "none";
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let outlineX = mouseX;
  let outlineY = mouseY;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant inner dot placement
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  }, { passive: true });

  // Smooth lerp for outer outline
  function renderCursor() {
    outlineX += (mouseX - outlineX) * 0.15;
    outlineY += (mouseY - outlineY) * 0.15;
    outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
    requestAnimationFrame(renderCursor);
  }
  requestAnimationFrame(renderCursor);

  // Hover states on interactive items
  const hoverSelectors = "a, button, input, textarea, .filter-btn, .btn-case-study";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverSelectors)) {
      document.body.classList.add("cursor-hover");
    }
    if (e.target.closest(".project-card")) {
      document.body.classList.add("cursor-card-hover");
    }
  });

  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverSelectors)) {
      document.body.classList.remove("cursor-hover");
    }
    if (e.target.closest(".project-card")) {
      document.body.classList.remove("cursor-card-hover");
    }
  });
}

/**
 * 2. Sticky Header with Background Blur On Scroll
 */
function initStickyHeader() {
  const header = document.getElementById("siteHeader");
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/**
 * 3. Mobile Hamburger Menu & Drawer
 */
function initMobileMenu() {
  const toggleBtn = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".mobile-nav-link");

  if (!toggleBtn || !mobileMenu) return;

  const toggle = () => {
    const isOpen = mobileMenu.classList.toggle("open");
    toggleBtn.classList.toggle("active", isOpen);
    toggleBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
    mobileMenu.setAttribute("aria-hidden", isOpen ? "false" : "true");
    document.body.style.overflow = isOpen ? "hidden" : "";
  };

  toggleBtn.addEventListener("click", toggle);

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (mobileMenu.classList.contains("open")) {
        toggle();
      }
    });
  });
}

/**
 * 4. Magnetic Interactive Hover Buttons
 */
function initMagneticButtons() {
  if (window.matchMedia("(pointer: coarse)").matches) return;

  const magneticElements = document.querySelectorAll("[data-magnetic]");

  magneticElements.forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      el.style.transform = `translate(${x * 0.22}px, ${y * 0.22}px)`;
    });

    el.addEventListener("mouseleave", () => {
      el.style.transform = "translate(0px, 0px)";
    });
  });
}

/**
 * 5. Project Case Study Modal
 */
function initCaseStudyModal() {
  const modal = document.getElementById("caseStudyModal");
  const modalBody = document.getElementById("modalBody");
  const closeBtn = document.getElementById("modalCloseBtn");
  const backdrop = document.getElementById("modalBackdrop");

  if (!modal || !modalBody) return;

  const closeModal = () => {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  closeBtn?.addEventListener("click", closeModal);
  backdrop?.addEventListener("click", closeModal);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeModal();
    }
  });

  // Attach global opener
  window.openCaseStudy = (projectId) => {
    const proj = portfolioData.projects.find((p) => p.id === projectId);
    if (!proj) return;

    modalBody.innerHTML = `
      <div class="modal-meta">
        <span>${escapeHtml(proj.category)}</span>
        <span>•</span>
        <span>YEAR: ${escapeHtml(proj.year)}</span>
      </div>
      <h2>${escapeHtml(proj.title)}</h2>
      <p class="modal-lead" style="color: #bbb; margin-bottom: 1.5rem;">${escapeHtml(proj.description)}</p>

      ${proj.caseStudy ? `
        <div class="modal-section">
          <h4>ARCHITECTURAL OVERVIEW</h4>
          <p>${escapeHtml(proj.caseStudy.overview)}</p>
        </div>
        <div class="modal-section">
          <h4>TECHNICAL CHALLENGE & PROBLEM</h4>
          <p>${escapeHtml(proj.caseStudy.problem)}</p>
        </div>
        <div class="modal-section">
          <h4>DEFENSIVE & ENGINEERING APPROACH</h4>
          <p>${escapeHtml(proj.caseStudy.approach)}</p>
        </div>
        <div class="modal-section">
          <h4>SYSTEM ARCHITECTURE</h4>
          <p>${escapeHtml(proj.caseStudy.architecture)}</p>
        </div>
        <div class="modal-section">
          <h4>KEY DELIVERABLES & OUTCOMES</h4>
          <p>${escapeHtml(proj.caseStudy.outcomes)}</p>
        </div>
      ` : ""}

      <div class="modal-section">
        <h4>TECHNOLOGIES & PROTOCOLS</h4>
        <div class="project-tech-tags" style="margin-top: 0.5rem;">
          ${proj.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join("")}
        </div>
      </div>

      <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
        <a href="${escapeHtml(proj.github || portfolioData.social.github)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">
          <span>VIEW GITHUB REPOSITORY</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
        </a>
      </div>
    `;

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };
}

/**
 * 5b. Showreel Video Modal
 */
function initVideoModal() {
  const btn = document.getElementById("btnPlayShowreel");
  const modal = document.getElementById("videoModal");
  const closeBtn = document.getElementById("videoModalCloseBtn");
  const backdrop = document.getElementById("videoModalBackdrop");
  const iframe = document.getElementById("videoIframe");

  if (!btn || !modal) return;

  const openVideo = () => {
    if (iframe && portfolioData.personal.showreelUrl) {
      iframe.src = portfolioData.personal.showreelUrl;
    }
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  };

  const closeVideo = () => {
    if (iframe) iframe.src = "";
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  };

  btn.addEventListener("click", openVideo);
  closeBtn?.addEventListener("click", closeVideo);
  backdrop?.addEventListener("click", closeVideo);

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("open")) {
      closeVideo();
    }
  });
}

/**
 * 5c. Draggable Before / After System Hardening Slider
 */
function initBeforeAfterSlider() {
  const container = document.getElementById("baContainer");
  const afterLayer = document.getElementById("baAfterLayer");
  const handle = document.getElementById("baHandle");

  if (!container || !afterLayer || !handle) return;

  let isDragging = false;

  const setSliderPosition = (clientX) => {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));

    afterLayer.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  };

  container.addEventListener("mousedown", (e) => {
    isDragging = true;
    setSliderPosition(e.clientX);
  });

  window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    setSliderPosition(e.clientX);
  });

  window.addEventListener("mouseup", () => {
    isDragging = false;
  });

  // Touch device events
  container.addEventListener("touchstart", (e) => {
    isDragging = true;
    if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    if (e.touches[0]) setSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener("touchend", () => {
    isDragging = false;
  });
}

/**
 * 6. Contact Form Validation and Secure Mailto Fallback
 */
function initContactForm() {
  const form = document.getElementById("contactForm");
  const nameInput = document.getElementById("formName");
  const emailInput = document.getElementById("formEmail");
  const messageInput = document.getElementById("formMessage");
  const statusAlert = document.getElementById("formStatusAlert");

  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const messageError = document.getElementById("messageError");

  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let isValid = true;

    // Name Validation
    if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
      nameError.textContent = "Please enter your full name (minimum 2 characters).";
      nameError.classList.add("visible");
      isValid = false;
    } else {
      nameError.classList.remove("visible");
    }

    // Email Validation
    if (!emailInput.value.trim() || !emailRegex.test(emailInput.value.trim())) {
      emailError.textContent = "Please provide a valid email address.";
      emailError.classList.add("visible");
      isValid = false;
    } else {
      emailError.classList.remove("visible");
    }

    // Message Validation
    if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
      messageError.textContent = "Please enter project details (at least 10 characters).";
      messageError.classList.add("visible");
      isValid = false;
    } else {
      messageError.classList.remove("visible");
    }

    if (!isValid) return;

    const senderName = nameInput.value.trim();
    const senderEmail = emailInput.value.trim();
    const senderMessage = messageInput.value.trim();

    // If custom API endpoint configured in portfolioData
    if (portfolioData.contactConfig && portfolioData.contactConfig.endpoint) {
      statusAlert.textContent = "Transmitting message securely...";
      statusAlert.className = "form-status-alert";
      statusAlert.style.display = "block";

      fetch(portfolioData.contactConfig.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: senderName, email: senderEmail, message: senderMessage })
      })
      .then((res) => {
        if (res.ok) {
          statusAlert.textContent = "Message transmitted successfully. Sandaru will respond promptly.";
          statusAlert.className = "form-status-alert success";
          form.reset();
        } else {
          throw new Error("Transmission error");
        }
      })
      .catch(() => {
        fallbackToMailto(senderName, senderEmail, senderMessage);
      });
    } else {
      // Safe fallback: Launch mailto
      fallbackToMailto(senderName, senderEmail, senderMessage);
    }
  });

  function fallbackToMailto(name, email, message) {
    const recipient = portfolioData.personal.email;
    const subject = encodeURIComponent(`Project Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nProject Details:\n${message}\n\n---\nTransmitted via sandaru-portfolio`
    );

    statusAlert.textContent = "Opening your email client to transmit inquiry directly...";
    statusAlert.className = "form-status-alert success";

    setTimeout(() => {
      window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
    }, 400);
  }
}

/**
 * 7. Back To Top
 */
function initBackToTop() {
  const btn = document.getElementById("backToTopBtn");
  btn?.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Safe HTML Sanitizer for dynamic rendering
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

