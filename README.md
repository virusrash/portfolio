# M. Sandaru Rashmika — Cinematic Portfolio

A production-quality, cinematic, dark-themed personal portfolio for **M. Sandaru Rashmika** — Cyber Security Specialist, Full Stack Developer, and IT Professional.

---

## ✦ Core Technical Identity & Visual Direction

- **Visual Direction**: Editorial, cinematic dark atmosphere inspired by modern high-end creative developer portfolios, bold typography, crimson red accents (`#FF3B3B`), and portrait layering.
- **Hero Composition**: Giant red background typography (`PORTFOLIO`), layered with Sandaru's authentic studio portrait, ambient WebGL particles, and high-impact typographic messaging.
- **Strict Information Integrity**: All information reflects Sandaru's verified profile — no fabricated statistics, no fake certifications, and no stock portraits.
- **Animation System**: GSAP 3, ScrollTrigger, and Lenis smooth scrolling for high-performance transforms and parallax effects.
- **Three.js Effects**: Lightweight particle dust atmosphere in the hero and an interactive abstract security node mesh in the Cybersecurity section.
- **Dynamic Content Architecture**: All content is managed in a single centralized file (`js/data.js`).

---

## ✦ Project Structure

```
PORTFOLIO/
├── index.html                   # Semantic HTML5 single-page layout
├── README.md                    # Project documentation
├── css/
│   ├── style.css                # Cinematic dark design system & typography
│   ├── animations.css           # GSAP reveal presets, cursor, & keyframes
│   └── responsive.css           # Breakpoints (320px – 1920px+)
├── js/
│   ├── data.js                  # Centralized content & verified information
│   ├── main.js                  # DOM renderer & initialization
│   ├── animations.js            # GSAP & Lenis smooth scrolling systems
│   ├── three-scene.js           # Three.js hero particles & node visualizer
│   └── interactions.js          # Custom cursor, filtering, modals, form
└── assets/
    ├── images/
    │   ├── sandaru-original.png # Original studio photograph (untouched)
    │   └── sandaru-cutout.png   # Transparent cutout portrait
    ├── projects/                # Project thumbnails and previews
    └── documents/               # Real CV storage (sandaru-cv.pdf)
```

---

## ✦ Running with VS Code Live Server

1. Open this `PORTFOLIO` folder in **Visual Studio Code**.
2. If not already installed, install the **Live Server** extension (by Ritwick Dey).
3. Right-click `index.html` and click **"Open with Live Server"** (or click "Go Live" in the bottom status bar).
4. The website will open in your default browser at `http://127.0.0.1:5500` (or `http://localhost:5500`).

---

## ✦ Editing Portfolio Content

All personal details, projects, education, social links, and skills are centrally configured in:
`js/data.js`

### Adding a Real CV File
1. Place your PDF in `assets/documents/sandaru-cv.pdf`.
2. In `js/data.js`, update:
   ```javascript
   personal: {
     cv: "assets/documents/sandaru-cv.pdf"
   }
   ```
3. The **"DOWNLOAD CV"** button in the hero section will automatically appear!

### Customizing Contact Form Endpoint
If you wish to receive inquiries directly through a form backend (e.g. Formspree or Formkeep):
1. In `js/data.js`, configure:
   ```javascript
   contactConfig: {
     endpoint: "https://formspree.io/f/your_form_id",
     recipientEmail: "srrashmika98@gmail.com"
   }
   ```
If left blank, the form automatically falls back to an accessible `mailto:` transmission.

---

## ✦ Technologies Used

- **HTML5 & CSS3**: Custom modern CSS variables, Grid, Flexbox, Clamp typography
- **Vanilla JavaScript ES Modules**: Modular, cleanly scoped application architecture
- **GSAP 3 & ScrollTrigger**: Cinematic reveals, parallax layering, timeline tracking
- **Lenis**: Physics-based smooth scrolling
- **Three.js**: WebGL particle atmosphere and abstract graph visualizer

