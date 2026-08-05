const telegramUrl = "https://t.me/M_TRANS_BY";

const siteHeader = document.querySelector(".site-header");
const menuToggle = document.querySelector(".mobile-menu-toggle");

function updateHeaderState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle("is-scrolled", window.scrollY > 18);
}

updateHeaderState();
window.addEventListener("scroll", updateHeaderState, { passive: true });

function closeMobileMenu() {
  if (!siteHeader || !menuToggle) return;
  siteHeader.classList.remove("is-menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.setAttribute("aria-label", "Открыть меню");
}

if (siteHeader && menuToggle) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    siteHeader.classList.toggle("is-menu-open", !isOpen);
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Открыть меню" : "Закрыть меню");
  });

  siteHeader.querySelectorAll("nav a").forEach((link) => link.addEventListener("click", closeMobileMenu));
  document.addEventListener("click", (event) => {
    if (!siteHeader.contains(event.target)) closeMobileMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMobileMenu();
  });
}

document.querySelectorAll(".steps article").forEach((step) => {
  const hint = step.querySelector(".step-tap-hint");
  const toggleStep = () => {
    if (!window.matchMedia("(max-width: 760px)").matches) return;
    const isOpen = step.classList.toggle("is-open");
    step.setAttribute("aria-expanded", String(isOpen));
    if (hint) hint.textContent = isOpen ? "Нажмите, чтобы скрыть" : "Нажмите, чтобы раскрыть";
  };

  step.addEventListener("click", toggleStep);
  step.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleStep();
    }
  });
});

document.querySelectorAll("[data-lead-form]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const message = [
      "Здравствуйте! Хочу получить расчёт рекламы на задней части автобуса.",
      `Имя: ${data.get("name") || "—"}`,
      `Компания: ${data.get("company") || "—"}`,
      `Телефон: ${data.get("phone") || "—"}`,
    ].join("\n");

    const button = form.querySelector('button[type="submit"]');
    if (button) button.textContent = "Открываем Telegram";

    window.open(`${telegramUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
});

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = [...carousel.querySelectorAll("[data-slide]")];
  const dots = carousel.querySelector(".carousel-dots");
  let active = 0;
  let timer;
  let touchStartX = null;

  slides.forEach((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Показать проект ${index + 1}`);
    dot.addEventListener("click", () => show(index, true));
    dots.append(dot);
  });

  const dotButtons = [...dots.children];
  const classNames = ["is-far-prev", "is-prev", "is-active", "is-next", "is-far-next"];

  function show(index, restart = false) {
    active = (index + slides.length) % slides.length;

    slides.forEach((slide) => slide.classList.remove(...classNames));
    slides.forEach((slide, slideIndex) => {
      let offset = slideIndex - active;
      if (offset > slides.length / 2) offset -= slides.length;
      if (offset < -slides.length / 2) offset += slides.length;

      const className = classNames[offset + 2];
      if (className) slide.classList.add(className);
    });

    dotButtons.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === active));
    if (restart) startAutoplay();
  }

  function startAutoplay() {
    window.clearInterval(timer);
    timer = window.setInterval(() => show(active + 1), 5000);
  }

  carousel.querySelector(".carousel-button--prev").addEventListener("click", () => show(active - 1, true));
  carousel.querySelector(".carousel-button--next").addEventListener("click", () => show(active + 1, true));
  carousel.addEventListener("mouseenter", () => window.clearInterval(timer));
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0]?.clientX ?? null;
    window.clearInterval(timer);
  }, { passive: true });
  carousel.addEventListener("touchend", (event) => {
    const touchEndX = event.changedTouches[0]?.clientX;
    if (touchStartX !== null && touchEndX !== undefined && Math.abs(touchStartX - touchEndX) > 42) {
      show(active + (touchStartX > touchEndX ? 1 : -1), true);
    } else {
      startAutoplay();
    }
    touchStartX = null;
  }, { passive: true });

  show(0);
  startAutoplay();
});
