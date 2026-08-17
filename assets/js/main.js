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

document.querySelectorAll("[data-region-map]").forEach((map) => {
  const regions = [...map.querySelectorAll("[data-region]")];
  const selectedRegion = map.querySelector("[data-selected-region]");
  const selectedCities = map.querySelector("[data-selected-cities]");
  const popover = map.querySelector("[data-region-popover]");
  const popoverRegion = map.querySelector("[data-popover-region]");
  const popoverCities = map.querySelector("[data-popover-cities]");

  function renderCities(list, cities) {
    if (!list) return;
    list.replaceChildren(...cities.map((city) => {
      const item = document.createElement("li");
      item.textContent = city;
      return item;
    }));
  }

  function selectRegion(region) {
    const cities = region.dataset.cities.split(",").map((city) => city.trim()).filter(Boolean);

    regions.forEach((item) => {
      const isSelected = item === region;
      item.classList.toggle("is-active", isSelected);
      item.setAttribute("aria-pressed", String(isSelected));
    });

    if (selectedRegion) selectedRegion.textContent = region.dataset.region;
    if (popoverRegion) popoverRegion.textContent = region.dataset.region;
    renderCities(selectedCities, cities);
    renderCities(popoverCities, cities);

    if (popover) {
      popover.style.setProperty("--popover-x", `${region.dataset.popoverX}%`);
      popover.style.setProperty("--popover-y", `${region.dataset.popoverY}%`);
    }
  }

  regions.forEach((region) => {
    region.addEventListener("click", () => selectRegion(region));
    region.addEventListener("mouseenter", () => selectRegion(region));
    region.addEventListener("focus", () => selectRegion(region));
    region.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        selectRegion(region);
      }
    });
  });

  const initialRegion = regions.find((region) => region.classList.contains("is-active")) || regions[0];
  if (initialRegion) selectRegion(initialRegion);
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
  const brandButtons = [...carousel.parentElement.querySelectorAll("[data-brand-index]")];
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
    brandButtons.forEach((button, buttonIndex) => {
      const isActive = buttonIndex === active;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    if (restart) startAutoplay();
  }

  function startAutoplay() {
    window.clearInterval(timer);
    timer = window.setInterval(() => show(active + 1), 5000);
  }

  carousel.querySelector(".carousel-button--prev").addEventListener("click", () => show(active - 1, true));
  carousel.querySelector(".carousel-button--next").addEventListener("click", () => show(active + 1, true));
  brandButtons.forEach((button) => button.addEventListener("click", () => show(Number(button.dataset.brandIndex), true)));
  slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
      if (index !== active) show(index, true);
    });
  });
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
