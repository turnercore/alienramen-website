/* ============================================================
   Alien Ramen – Landing Page Script
   ============================================================ */

(function () {
  "use strict";

  /* ── Starfield ──────────────────────────────────────────────── */
  const canvas = document.getElementById("starfield");
  const ctx = canvas.getContext("2d");
  let stars = [];
  const STAR_COUNT = 180;

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x:       Math.random() * canvas.width,
        y:       Math.random() * canvas.height,
        radius:  Math.random() * 1.6 + 0.2,
        alpha:   Math.random(),
        speed:   Math.random() * 0.004 + 0.002,
        phase:   Math.random() * Math.PI * 2,
      });
    }
  }

  function drawStars(timestamp) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(function (star) {
      star.alpha = 0.4 + 0.6 * Math.abs(Math.sin(timestamp * star.speed + star.phase));
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(226, 232, 240, " + star.alpha + ")";
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  createStars();
  requestAnimationFrame(drawStars);

  window.addEventListener("resize", function () {
    resizeCanvas();
    createStars();
  });

  /* ── Nav scroll shadow ──────────────────────────────────────── */
  var nav = document.getElementById("nav");

  function updateNav() {
    if (window.scrollY > 40) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", updateNav, { passive: true });
  updateNav();

  /* ── Mobile nav toggle ──────────────────────────────────────── */
  var navToggle = document.getElementById("navToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function closeMobileMenu() {
    navToggle.classList.remove("open");
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    navToggle.setAttribute("aria-expanded", "false");
  }

  navToggle.addEventListener("click", function () {
    var isOpen = mobileMenu.classList.toggle("open");
    navToggle.classList.toggle("open");
    mobileMenu.setAttribute("aria-hidden", String(!isOpen));
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Close mobile menu when a link is clicked
  mobileMenu.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileMenu);
  });

  // Close mobile menu on outside click (not triggered when clicking the toggle itself)
  document.addEventListener("click", function (e) {
    if (e.target === navToggle || navToggle.contains(e.target)) { return; }
    if (!mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });

  /* ── Footer year ────────────────────────────────────────────── */
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* ── Sign-up form ───────────────────────────────────────────── */
  var signupForm = document.getElementById("signupForm");
  var signupMessage = document.getElementById("signupMessage");

  function isValidEmail(email) {
    // Rejects consecutive dots, leading/trailing dots in domain, and obvious typos
    return /^[^\s@]+@(?!-)(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/.test(email)
      && !/\.{2,}/.test(email);
  }

  if (signupForm) {
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();

      var emailInput = document.getElementById("emailInput");
      var email = emailInput.value.trim();

      signupMessage.className = "signup__message";
      signupMessage.textContent = "";

      if (!email) {
        signupMessage.classList.add("signup__message--error");
        signupMessage.textContent = "Please enter your email address.";
        emailInput.focus();
        return;
      }

      if (!isValidEmail(email)) {
        signupMessage.classList.add("signup__message--error");
        signupMessage.textContent = "Please enter a valid email address.";
        emailInput.focus();
        return;
      }

      // Simulate a successful signup (replace with real API call when ready)
      signupMessage.classList.add("signup__message--success");
      signupMessage.textContent =
        "🚀 You're on the list! We'll be in touch with cosmic news.";
      emailInput.value = "";
    });
  }

  /* ── Scroll-reveal animation ────────────────────────────────── */
  if (typeof IntersectionObserver !== "undefined") {
    var revealEls = document.querySelectorAll(".card, .feature, .section__title, .section__subtitle");

    revealEls.forEach(function (el) {
      el.style.opacity  = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.style.opacity  = "1";
            entry.target.style.transform = "translateY(0)";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach(function (el) { observer.observe(el); });
  }
})();
