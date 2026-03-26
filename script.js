(function () {
  const themeToggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // Theme: default to user's preference, then remember choice.
  const storedTheme = localStorage.getItem("portfolio-theme");
  const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
  const initialTheme = storedTheme || (prefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", initialTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("portfolio-theme", next);
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!formStatus) return;

      const name = String(document.getElementById("name")?.value || "").trim();
      const email = String(document.getElementById("email")?.value || "").trim();
      const message = String(document.getElementById("message")?.value || "").trim();

      // Basic client-side check (browser validation still handles most cases).
      if (!name || !email || !message) {
        formStatus.textContent = "Please fill in all fields.";
        return;
      }

      const to = "eliasalhaddad2003@gmail.com";
      const subject = `Portfolio message from ${name}`;
      const body = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        message,
      ].join("\n");

      const mailto = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
        body
      )}`;

      formStatus.textContent = "Opening your email client…";
      window.location.href = mailto;
    });
  }

  // Avatar: if `assets/avatar.png` is missing, show the initials fallback.
  const avatarImg = document.getElementById("avatarImg");
  const avatarFallback = document.getElementById("avatarFallback");
  if (avatarImg && avatarFallback) {
    // Default: show fallback. If the image loads, hide it.
    avatarFallback.style.display = "flex";

    avatarImg.addEventListener("load", () => {
      avatarFallback.style.display = "none";
    });
    avatarImg.addEventListener("error", () => {
      avatarFallback.style.display = "flex";
    });
  }
})();

