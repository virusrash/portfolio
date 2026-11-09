/**
 * GSAP Cinematic Motion System + Studio Freight Lenis Smooth Scrolling
 * Synchronized ScrollTrigger animations, timeline drawing, parallax, and reveals.
 */

export function initAnimations() {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // 1. Initialize Lenis Smooth Scrolling (if library loaded and not reduced motion)
  let lenis = null;
  if (typeof Lenis !== "undefined" && !prefersReducedMotion) {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false
    });

    lenis.on("scroll", () => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.update();
      }
    });

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);
  }

  // Check GSAP presence
  if (typeof gsap === "undefined") {
    console.warn("GSAP not loaded. Skipping complex animation timelines.");
    return;
  }

  if (typeof ScrollTrigger !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  if (prefersReducedMotion) {
    // Show elements immediately without transitions
    gsap.set([
      ".giant-word",
      ".hero-portrait-layer",
      ".hero-col-left",
      ".hero-col-right",
      ".hero-scroll-indicator",
      ".project-card",
      ".comp-card",
      ".process-step-item"
    ], { opacity: 1, y: 0 });
    return;
  }

  // 2. Cinematic Hero Intro Sequence
  const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

  heroTl
    // Giant typography reveal
    .fromTo(".giant-word", 
      { opacity: 0, scale: 0.85, y: 80 }, 
      { opacity: 0.95, scale: 1, y: 0, duration: 1.6 }
    )
    // Portrait Entrance
    .fromTo(".hero-portrait-layer",
      { opacity: 0, scale: 0.92, y: 60 },
      { opacity: 1, scale: 1, y: 0, duration: 1.4 },
      "-=1.2"
    )
    // Left introduction script
    .fromTo(".hero-eyebrow-script",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=1.0"
    )
    // Name heading
    .fromTo(".hero-name-heading .name-line",
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.15 },
      "-=0.8"
    )
    // Roles Banner
    .fromTo(".hero-roles-banner",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.6"
    )
    // Short Bio & Location Tag
    .fromTo([".hero-bio-short", ".hero-location-tag"],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
      "-=0.6"
    )
    // CTA Group
    .fromTo(".hero-cta-group .btn",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.12 },
      "-=0.5"
    )
    // Right column expertise stats
    .fromTo(".stat-item",
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.8, stagger: 0.15 },
      "-=0.8"
    )
    // Bottom Scroll Indicator
    .fromTo(".hero-scroll-indicator",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8 },
      "-=0.4"
    );

  // 3. Hero Scroll Parallax
  if (typeof ScrollTrigger !== "undefined") {
    gsap.to(".giant-word", {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: 120,
      opacity: 0.3
    });

    gsap.to(".portrait-container", {
      scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      y: -50
    });

    // 4. Section Headers & Eyebrows Reveal
    document.querySelectorAll(".section-header").forEach((header) => {
      gsap.fromTo(header.children,
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: header,
            start: "top 85%",
            toggleActions: "play none none none"
          },
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out"
        }
      );
    });

    // 5. Selected Projects Stagger
    ScrollTrigger.batch(".project-card", {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.18, ease: "power2.out" }
        );
      },
      once: true
    });

    // 6. Security Competencies Stagger
    ScrollTrigger.batch(".comp-card", {
      start: "top 90%",
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, x: 30 },
          { opacity: 1, x: 0, duration: 0.8, stagger: 0.12, ease: "power2.out" }
        );
      },
      once: true
    });

    // 7. Tech Stack Cards Stagger
    ScrollTrigger.batch(".tech-cat-card", {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power2.out" }
        );
      },
      once: true
    });

    // 8. IT Operations Cards Stagger
    ScrollTrigger.batch(".itops-card", {
      start: "top 88%",
      onEnter: (batch) => {
        gsap.fromTo(batch,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.14, ease: "power2.out" }
        );
      },
      once: true
    });

    // 9. Process Timeline Red Line Draw On Scroll
    const processSection = document.getElementById("process");
    const lineBar = document.getElementById("processLineBar");
    if (processSection && lineBar) {
      ScrollTrigger.create({
        trigger: processSection,
        start: "top 70%",
        end: "bottom 80%",
        scrub: true,
        onUpdate: (self) => {
          const progressPercent = Math.min(100, Math.max(0, self.progress * 100));
          lineBar.style.height = `${progressPercent}%`;
        }
      });

      // Highlight step marker nodes as they cross threshold
      document.querySelectorAll(".process-step-item").forEach((step) => {
        ScrollTrigger.create({
          trigger: step,
          start: "top 75%",
          onEnter: () => step.classList.add("active"),
          onLeaveBack: () => step.classList.remove("active")
        });
      });
    }

    // 10. Sticky Navbar Active Section Highlighting
    const sections = ["hero", "work", "security", "development", "itops", "about", "toolkit", "process", "journey", "contact"];
    const navLinks = document.querySelectorAll(".nav-link");

    sections.forEach((sectionId) => {
      const sectionEl = document.getElementById(sectionId);
      if (!sectionEl) return;

      ScrollTrigger.create({
        trigger: sectionEl,
        start: "top 35%",
        end: "bottom 35%",
        onEnter: () => setActiveNavLink(sectionId),
        onEnterBack: () => setActiveNavLink(sectionId)
      });
    });

    function setActiveNavLink(id) {
      navLinks.forEach((link) => {
        const href = link.getAttribute("href");
        if (href === `#${id}`) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      });
    }
  }
}

