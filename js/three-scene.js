/**
 * Three.js Atmospheric Systems
 * 1. Hero Ambient Floating Particle System
 * 2. Security Section Abstract Interconnected Node Mesh
 * 
 * High performance: Capped DPR, IntersectionObserver pausing, graceful fallback.
 */

export function initThreeScenes() {
  // Check WebGL availability
  if (!window.WebGLRenderingContext) {
    console.warn("WebGL not supported; falling back to CSS visuals.");
    return;
  }

  // Check prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  initHeroAtmosphere(prefersReducedMotion);
  initSecurityNodeMesh(prefersReducedMotion);
}

/**
 * Hero Ambient Floating Particle & Dust Field
 */
function initHeroAtmosphere(reducedMotion) {
  const container = document.getElementById("heroThreeContainer");
  if (!container) return;

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || window.innerHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
  camera.position.z = 40;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, powerPreference: "low-power" });
  } catch (e) {
    console.warn("WebGL Renderer creation failed:", e);
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  container.appendChild(renderer.domElement);

  // Particles
  const particleCount = window.innerWidth < 768 ? 40 : 90;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);

  // Subtle crimson (#FF3B3B) and dim white (#FFFFFF)
  const redColor = new THREE.Color(0xff3b3b);
  const whiteColor = new THREE.Color(0x9a9a9a);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 80;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 40;

    // 25% crimson accent, 75% subtle white/gray
    const isRed = Math.random() < 0.25;
    const c = isRed ? redColor : whiteColor;
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({
    size: 1.4,
    vertexColors: true,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });

  const particleSystem = new THREE.Points(geometry, material);
  scene.add(particleSystem);

  let mouseX = 0;
  let mouseY = 0;
  let targetX = 0;
  let targetY = 0;

  if (!reducedMotion) {
    window.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX - window.innerWidth / 2) * 0.0008;
      mouseY = (e.clientY - window.innerHeight / 2) * 0.0008;
    }, { passive: true });
  }

  // Animation Loop with Visibility Observer
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(container);

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    if (!reducedMotion) {
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      particleSystem.rotation.y += 0.0006;
      particleSystem.rotation.x += 0.0003;
      camera.position.x = targetX * 15;
      camera.position.y = -targetY * 15;
      camera.lookAt(scene.position);
    }

    renderer.render(scene, camera);
  }

  animate();

  // Resize Handler
  window.addEventListener("resize", () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }, { passive: true });
}

/**
 * Security Section Abstract Interconnected Node Mesh
 * Represents abstract defensive topology (decorative, not fake scanner)
 */
function initSecurityNodeMesh(reducedMotion) {
  const container = document.getElementById("secVisualCanvas");
  if (!container) return;

  const width = container.clientWidth || 400;
  const height = container.clientHeight || 350;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 500);
  camera.position.z = 24;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch (e) {
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  container.appendChild(renderer.domElement);

  // Group of interconnected nodes
  const group = new THREE.Group();
  scene.add(group);

  const nodeCount = 18;
  const nodes = [];
  const sphereGeo = new THREE.SphereGeometry(0.35, 12, 12);
  const redMat = new THREE.MeshBasicMaterial({ color: 0xff3b3b });
  const whiteMat = new THREE.MeshBasicMaterial({ color: 0x444444 });

  for (let i = 0; i < nodeCount; i++) {
    const mesh = new THREE.Mesh(sphereGeo, i % 3 === 0 ? redMat : whiteMat);
    mesh.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 8
    );
    mesh.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015
      )
    };
    nodes.push(mesh);
    group.add(mesh);
  }

  // Interconnecting Lines
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0xff3b3b,
    transparent: true,
    opacity: 0.18
  });

  let lineGeometry = new THREE.BufferGeometry();
  let lineSegments = new THREE.LineSegments(lineGeometry, lineMaterial);
  group.add(lineSegments);

  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    isVisible = entries[0].isIntersecting;
  }, { threshold: 0.1 });
  observer.observe(container);

  function updateNodes() {
    const linePositions = [];

    for (let i = 0; i < nodeCount; i++) {
      const node = nodes[i];
      if (!reducedMotion) {
        node.position.add(node.userData.velocity);
        if (Math.abs(node.position.x) > 8) node.userData.velocity.x *= -1;
        if (Math.abs(node.position.y) > 6) node.userData.velocity.y *= -1;
        if (Math.abs(node.position.z) > 4) node.userData.velocity.z *= -1;
      }

      // Check distance with others
      for (let j = i + 1; j < nodeCount; j++) {
        const other = nodes[j];
        const dist = node.position.distanceTo(other.position);
        if (dist < 6.5) {
          linePositions.push(
            node.position.x, node.position.y, node.position.z,
            other.position.x, other.position.y, other.position.z
          );
        }
      }
    }

    lineSegments.geometry.dispose();
    lineSegments.geometry = new THREE.BufferGeometry();
    lineSegments.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
  }

  function animateSec() {
    requestAnimationFrame(animateSec);
    if (!isVisible) return;

    if (!reducedMotion) {
      group.rotation.y += 0.002;
      group.rotation.x += 0.001;
      updateNodes();
    }

    renderer.render(scene, camera);
  }

  animateSec();

  window.addEventListener("resize", () => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  }, { passive: true });
}

