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
    if (button) button.firstChild.textContent = "Открываем Telegram ";

    window.open(`${telegramUrl}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
  });
});
