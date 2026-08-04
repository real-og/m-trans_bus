const telegramUrl = "https://t.me/M_TRANS_BY";

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

  show(0);
  startAutoplay();
});
