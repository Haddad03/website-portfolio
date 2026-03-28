(function () {
  const themeToggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ============================================================
  // THEME
  // ============================================================
  const storedTheme = localStorage.getItem("portfolio-theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = storedTheme || (prefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", initialTheme);
  if (themeToggle) {
    themeToggle.querySelector("span").textContent = initialTheme === "dark" ? "🌙" : "☀️";
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
      themeToggle.querySelector("span").textContent = next === "dark" ? "🌙" : "☀️";
    });
  }

  // ============================================================
  // CONTACT FORM
  // ============================================================
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!formStatus) return;

      const name = String(document.getElementById("name")?.value || "").trim();
      const email = String(document.getElementById("email")?.value || "").trim();
      const message = String(document.getElementById("message")?.value || "").trim();

      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        return;
      }

      const to = "eliasalhaddad2003@gmail.com";
      const subject = `Portfolio message from ${name}`;
      const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");
      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

      formStatus.textContent = "Opening your email client…";
      window.location.href = mailto;
    });
  }

  // ============================================================
  // AVATAR FALLBACK
  // ============================================================
  const avatarImg = document.getElementById("avatarImg");
  const avatarFallback = document.getElementById("avatarFallback");
  if (avatarImg && avatarFallback) {
    avatarFallback.style.display = "flex";
    avatarImg.addEventListener("load", () => {
      avatarFallback.style.display = "none";
    });
    avatarImg.addEventListener("error", () => {
      avatarFallback.style.display = "flex";
    });
  }

  // ============================================================
  // SCROLL PROGRESS BAR
  // ============================================================
  const scrollProgress = document.getElementById("scrollProgress");
  if (scrollProgress) {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      scrollProgress.style.transform = `scaleX(${progress})`;
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
  }

  // ============================================================
  // SCROLL REVEAL
  // ============================================================
  const revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("in-view");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
      );
      revealEls.forEach((el) => observer.observe(el));
    } else {
      // Fallback for older browsers
      revealEls.forEach((el) => el.classList.add("in-view"));
    }
  }
})();
