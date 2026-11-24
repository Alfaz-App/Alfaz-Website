/**
 * ALFAZ Landing Page Interactive Logic
 * Couplet reels, Theme preview switcher, and Soundscape simulator
 */

const COUPLETS = [
  {
    lines: [
      "हज़ारों ख़्वाहिशें ऐसी कि हर ख़्वाहिश पे दम निकले",
      "बहुत निकले मिरे अरमान लेकिन फिर भी कम निकले"
    ],
    author: "Mirza Ghalib",
    category: "Classical Urdu • Hinglish"
  },
  {
    lines: [
      "The wound is the place where the Light enters you.",
      "Silence is the language of God, all else is poor translation."
    ],
    author: "Jalaluddin Rumi",
    category: "World Literature • English"
  },
  {
    lines: [
      "तू भी सादा है कभी चाल बदलता ही नहीं",
      "हम भी सादा हैं इसी चाल में आ जाते हैं"
    ],
    author: "Jaun Elia",
    category: "Contemporary Nazm • Roman Script"
  },
  {
    lines: [
      "हो गई है पीर पर्वत-सी पिघलनी चाहिए",
      "इस हिमालय से कोई गंगा निकलनी चाहिए"
    ],
    author: "Dushyant Kumar",
    category: "Hindi Kavita • Devanagari"
  }
];

let currentIndex = 0;

function updateMockupCouplet(index) {
  const data = COUPLETS[index];
  const verseEl = document.getElementById("mockupVerse");
  const authorEl = document.getElementById("mockupAuthor");
  const catEl = document.getElementById("mockupCategory");

  if (!verseEl || !authorEl) return;

  // Fade out
  verseEl.style.opacity = "0";
  verseEl.style.transform = "translateY(6px)";

  setTimeout(() => {
    verseEl.innerHTML = data.lines.join("<br>");
    authorEl.textContent = data.author;
    if (catEl) catEl.textContent = data.category;

    // Fade in
    verseEl.style.transition = "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)";
    verseEl.style.opacity = "1";
    verseEl.style.transform = "translateY(0)";
  }, 200);
}

function nextCouplet() {
  currentIndex = (currentIndex + 1) % COUPLETS.length;
  updateMockupCouplet(currentIndex);
}

function setMockupTheme(theme) {
  const screen = document.getElementById("mockupScreen");
  if (!screen) return;

  // Remove existing theme classes
  screen.classList.remove("theme-velvet", "theme-ivory");

  if (theme === "velvet") {
    screen.classList.add("theme-velvet");
  } else if (theme === "ivory") {
    screen.classList.add("theme-ivory");
  }

  // Update button active state
  document.querySelectorAll(".pill-btn").forEach(btn => btn.classList.remove("active"));
  const activeBtn = document.querySelector(`[data-theme="${theme}"]`);
  if (activeBtn) activeBtn.classList.add("active");
}

document.addEventListener("DOMContentLoaded", () => {
  updateMockupCouplet(0);

  // Initialize Animated Stardust & Interactive Cursor Glow
  initAmbientCanvas();
  initCursorGlow();

  // Auto-cycle couplets every 6 seconds
  setInterval(nextCouplet, 6000);

  // Theme buttons
  document.querySelectorAll(".pill-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const theme = e.currentTarget.getAttribute("data-theme");
      setMockupTheme(theme);
    });
  });

  // Mobile navigation drawer toggle
  const mobileToggle = document.getElementById("mobileNavToggle");
  const mobileDrawer = document.getElementById("mobileDrawer");
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileDrawer.classList.toggle("open");
    });

    // Close mobile drawer when clicking any link
    mobileDrawer.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileDrawer.classList.remove("open");
      });
    });

    // Close mobile drawer when clicking outside
    document.addEventListener("click", (e) => {
      if (!mobileDrawer.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileDrawer.classList.remove("open");
      }
    });
  }
});

// Ambient Stardust & Celestial Particles Canvas
function initAmbientCanvas() {
  const canvas = document.getElementById("ambientCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(width > 768 ? 42 : 18, 50);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -0.2 - Math.random() * 0.4,
      radius: Math.random() * 1.5 + 0.6,
      alpha: Math.random() * 0.5 + 0.25,
      pulse: Math.random() * Math.PI,
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.pulse += 0.02;

      // Wrap around edges
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;

      const currentAlpha = Math.max(0.1, p.alpha * (0.65 + 0.35 * Math.sin(p.pulse)));

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(212, 175, 55, ${currentAlpha})`;
      ctx.shadowBlur = 6;
      ctx.shadowColor = "rgba(212, 175, 55, 0.4)";
      ctx.fill();

      // Subtle constellation connection lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 95) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(212, 175, 55, ${(1 - dist / 95) * 0.12})`;
          ctx.lineWidth = 0.6;
          ctx.shadowBlur = 0;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(render);
  }

  render();
}

// Interactive Spotlight Cursor Glow
function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || window.innerWidth < 768) return;

  let mouseX = -500;
  let mouseY = -500;
  let curX = -500;
  let curY = -500;

  window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    glow.style.opacity = "1";
  });

  window.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });

  function animateGlow() {
    curX += (mouseX - curX) * 0.08;
    curY += (mouseY - curY) * 0.08;
    glow.style.left = `${curX}px`;
    glow.style.top = `${curY}px`;
    requestAnimationFrame(animateGlow);
  }

  animateGlow();
}

