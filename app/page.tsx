"use client";

import { FormEvent, useState } from "react";

const phoneDisplay = "+375 (29) 60-65-651";
const phoneHref = "tel:+375296065651";
const telegramHref = "https://t.me/M_TRANS_BY";

const problems = [
  ["01", "Реклама дорожает", "Цена клика растёт, а клиентов становится меньше."],
  ["02", "Объявления пролистывают", "Люди не видят баннеры и ленты — взгляд фиксируется всего на 0,5 секунды."],
  ["03", "Статичная реклама теряется", "Водитель следит за дорогой, а пешеход чаще смотрит в экран."],
];

const benefits = [
  ["Прямой контакт с водителями", "Реклама находится точно на уровне глаз водителей — в пробке, на светофоре и в движении."],
  ["Эффект вынужденного просмотра", "Её невозможно пролистать: сообщение остаётся в поле зрения на протяжении маршрута."],
  ["Работает ежедневно", "Бренд видят водители, пассажиры и пешеходы каждый день."],
  ["Удерживает внимание", "На дорогах и остановках реклама постоянно возвращается в поле зрения."],
];

const metrics = [
  ["~250 км", "средний пробег автобуса в день"],
  ["до 17 часов", "на линии ежедневно"],
  [">1,2 млн", "потенциальных контактов в месяц"],
  ["1000+", "размещений по всей стране"],
];

const steps = [
  ["Свяжитесь с нами", "Расскажите об идее — быстро подберём оптимальный путь для старта."],
  ["Готовим макет", "Можно без готового дизайна. Нарисуем с нуля и покажем, как будет выглядеть проект."],
  ["Согласуем детали", "Обсудим материалы, требования и возьмём согласование макета на себя."],
  ["Запустим в работу", "После утверждения проект сразу идёт в печать, оклейку и на маршрут."],
];

const formats = [
  ["Быстрый старт", "1 автобус", "Полная оклейка задней части — заметный мобильный билборд для локальной кампании."],
  ["Больше охвата", "Несколько маршрутов", "Распределим транспорт по городу, чтобы увеличить частоту контакта с вашей аудиторией."],
  ["Масштаб", "Автопарк", "Кампания на нескольких автобусах с единым визуальным сообщением и прозрачным расчётом."],
];

const quality = [
  ["Фотоотчёт", "Фиксируем результат оклейки и передаём отчёт, подтверждающий реальное размещение."],
  ["Сохранность оклейки", "При повреждении или браке выполняем ремонт за свой счёт."],
  ["Всегда на связи", "Обеспечиваем прозрачность и поддержку на всех этапах кампании."],
];

const faqs = [
  ["Как быстро можно запустить рекламу?", "Запуск возможен в течение 3 дней. Мы берём на себя дизайн, печать и оклейку."],
  ["Что нужно от меня для создания макета?", "Достаточно логотипа и базовой информации о компании. Если дизайна нет — разработаем его с нуля."],
  ["Нужно ли согласовывать макет и кто этим занимается?", "Да. Мы полностью берём согласование с исполнительными органами на себя: знаем регламенты и требования, чтобы пройти процесс без лишних задержек."],
  ["Можно ли выбрать количество автобусов?", "Да. Вы выбираете объём под бюджет и цели — от одного автобуса до масштабной кампании."],
  ["На сколько времени можно разместить рекламу?", "Срок может быть разным. Чем дольше работает реклама, тем выше узнаваемость. Оптимальный период подскажем исходя из задач."],
  ["Что происходит, если автобус попадает в ДТП?", "Мы оперативно решаем такие ситуации без потери эффективности кампании — бесплатно для вас."],
];

function LeadForm({ compact = false }: { compact?: boolean }) {
  const [sent, setSent] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const text = encodeURIComponent(`Здравствуйте! Хочу получить расчёт рекламы на задней части автобуса.\nИмя: ${form.get("name") || "—"}\nКомпания: ${form.get("company") || "—"}\nТелефон: ${form.get("phone") || "—"}`);
    setSent(true);
    window.open(`${telegramHref}?text=${text}`, "_blank", "noopener,noreferrer");
  }
  return <form className={`lead-form ${compact ? "lead-form--compact" : ""}`} onSubmit={submit}>
    <label><span>Ваше имя*</span><input name="name" required autoComplete="name" placeholder="Иван" /></label>
    {!compact && <label><span>Ваша компания</span><input name="company" autoComplete="organization" placeholder="Название компании" /></label>}
    <label><span>Ваш номер телефона*</span><input name="phone" required autoComplete="tel" inputMode="tel" placeholder="+375 (__) ___-__-__" /></label>
    <button className="button button--dark" type="submit">{sent ? "Открываем Telegram" : "Получить расчёт"}<span aria-hidden="true">↗</span></button>
    <p className="form-note">Нажимая кнопку, вы соглашаетесь с обработкой персональных данных.</p>
  </form>;
}

export default function Home() {
  return <main>
    <header className="site-header">
      <a className="logo" href="#top" aria-label="M-TRANS.BY — на главную"><span className="logo-mark">M</span><span>M-TRANS<small>делаем бренды мобильными</small></span></a>
      <nav aria-label="Основная навигация"><a href="#advantages">Преимущества</a><a href="#process">Как работаем</a><a href="#formats">Форматы</a><a href="#faq">FAQ</a></nav>
      <a className="header-phone" href={phoneHref}>{phoneDisplay}</a><a className="button button--small" href="#contact">Получить расчёт</a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy"><div className="eyebrow"><span />Реклама, которую невозможно проигнорировать</div><h1>Реклама на задней части <em>автобуса</em></h1><p className="hero-lead">Ваш мобильный билборд на колёсах, который работает до 17 часов в сутки.</p><ul className="check-list"><li>Запустим кампанию за 3 дня</li><li>Дизайн-макет за 1 час — бесплатно</li><li>Дизайн, печать и оклейка под ключ</li></ul><div className="hero-actions"><a className="button button--accent" href="#contact">Получить расчёт <span>↗</span></a><a className="text-link" href={telegramHref} target="_blank" rel="noreferrer">Написать в Telegram <span>↗</span></a></div></div>
      <div className="hero-visual"><img src="/hero-bus.webp" alt="Автобус с яркой рекламой на задней части в городском потоке" width="1568" height="1003" fetchPriority="high" /><div className="hero-badge"><strong>1 час</strong><span>макет бесплатно</span></div><div className="route-chip"><span>●</span>Ваш бренд движется по городу</div></div>
      <aside className="hero-form-card" aria-label="Форма расчёта"><div><span className="mini-label">Быстрый расчёт</span><strong>Узнайте стоимость вашей кампании</strong></div><LeadForm compact /></aside>
    </section>

    <section className="section problem-section"><div className="section-heading split-heading"><div><span className="section-index">01 / Зачем</span><h2>Если бренд не замечают — <em>у него не покупают</em></h2></div><p>В мире коротких контактов выигрывает формат, который естественно становится частью пути клиента.</p></div><div className="problem-grid">{problems.map(([number,title,text])=><article className="problem-card" key={number}><span className="card-number">{number}</span><div className="problem-icon" aria-hidden="true"><span /></div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="section section--dark" id="advantages"><div className="section-heading split-heading"><div><span className="section-index">02 / Решение</span><h2>Заметный формат, который <em>невозможно проигнорировать</em></h2></div><p>Реклама становится частью дорожной сцены и остаётся перед глазами дольше обычного баннера.</p></div><div className="advantage-layout"><div className="pov-frame"><img src="/driver-pov.webp" alt="Вид водителя на рекламу на задней части автобуса" width="1536" height="1024" loading="lazy" /><div className="focus-line"><span>Уровень взгляда водителя</span></div></div><div className="benefit-list">{benefits.map(([title,text],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="metrics-section"><div className="metrics-intro"><span className="section-index">03 / Эффективность</span><h2>Эффективность. <em>В цифрах</em></h2><p>Рассчитываем потенциальный охват и ключевые показатели: вы получаете ориентиры по контактам, охвату и частоте показа.</p></div><div className="metrics-grid">{metrics.map(([value,label])=><article key={value}><strong>{value}</strong><span>{label}</span></article>)}</div><p className="data-note">* Финальные медиапоказатели уточняются под город, маршруты и период размещения.</p></section>

    <section className="section easy-start"><div className="section-heading center-heading"><span className="section-index">Начать проще, чем кажется</span><h2>От идеи до выхода <em>на маршрут</em></h2></div><div className="start-stats"><article><span>01</span><strong>1 автобус</strong><p>достаточно, чтобы начать уже сегодня</p></article><article className="featured"><span>02</span><strong>3 дня</strong><p>от заявки до запуска рекламы</p></article><article><span>03</span><strong>1000+</strong><p>размещений по всей стране</p></article></div></section>

    <section className="section process-section" id="process"><div className="section-heading split-heading"><div><span className="section-index">04 / Процесс</span><h2>От заявки до результата — <em>4 простых шага</em></h2></div><p>Начните продвижение бренда уже сегодня. Мы ведём проект от идеи до выхода автобуса на линию.</p></div><div className="steps">{steps.map(([title,text],i)=><article key={title}><div className="step-top"><span>{i+1}</span>{i<3&&<i />}</div><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="section section--dark" id="formats"><div className="section-heading split-heading"><div><span className="section-index">05 / Форматы и цены</span><h2>Множество масштабов. <em>Один заметный результат</em></h2></div><p>Предложим решение под ваш бюджет — от одного автобуса до целого автопарка.</p></div><div className="format-grid">{formats.map(([label,title,text],i)=><article className={`format-card ${i===1?"featured":""}`} key={title}><span className="mini-label">{label}</span><h3>{title}</h3><p>{text}</p><div className="price-placeholder">Стоимость — по расчёту</div><a href="#contact">Рассчитать стоимость <span>↗</span></a></article>)}</div><div className="format-trigger"><strong>1 единица транспорта</strong><span>— чтобы начать уже сегодня</span></div></section>

    <section className="brands-section" aria-labelledby="brands-title"><p>Ритейл, e-commerce, медицина, сервисы и другие сферы</p><h2 id="brands-title">Нам доверяют <em>бренды</em></h2><div className="brand-row"><span>ОМА</span><span>АВТОСЕТЬ</span><span>MCDODO</span><span>ФАРАОН</span><span>M-TRANS</span></div></section>

    <section className="section quality-section"><div className="quality-image"><img src="/quality-control.webp" alt="Проверка качества оклейки автобуса рекламой" width="1536" height="1024" loading="lazy" /></div><div className="quality-content"><span className="section-index">06 / Гарантии</span><h2>Контроль качества <em>на каждом этапе</em></h2><div className="quality-list">{quality.map(([title,text],i)=><article key={title}><span>0{i+1}</span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="section faq-section" id="faq"><div className="faq-title"><span className="section-index">07 / FAQ</span><h2>Часто задаваемые <em>вопросы</em></h2><p>Не нашли ответ? Напишите нам — подскажем формат и рассчитаем кампанию.</p><a className="text-link" href={telegramHref}>Задать вопрос в Telegram ↗</a></div><div className="faq-list">{faqs.map(([question,answer],i)=><details key={question} open={i===0}><summary><span>{question}</span><i>+</i></summary><p>{answer}</p></details>)}</div></section>

    <section className="contact-section" id="contact"><div className="contact-copy"><span className="section-index">Обсудим ваш проект</span><h2>Вашему бизнесу <em>с нами по пути</em></h2><p>Посмотрите, как будет выглядеть ваш бренд на транспорте. Запросите макет — дизайн за 1 час бесплатно.</p><div className="contact-links"><a href={telegramHref}>Telegram ↗</a><a href={phoneHref}>{phoneDisplay}</a></div><ul><li>Запуск за 3 дня</li><li>Решение под ваш бюджет</li><li>Без скрытых расходов</li></ul></div><div className="contact-form-wrap"><LeadForm /></div></section>

    <footer><div className="logo logo--footer"><span className="logo-mark">M</span><span>M-TRANS<small>делаем бренды мобильными</small></span></div><div><strong>ООО «М-ТРАНС Медиа»</strong><span>УНП 193 586 686</span><a href="mailto:info@m-trans.by">info@m-trans.by</a></div><div><a href={phoneHref}>{phoneDisplay}</a><a href={telegramHref}>Telegram</a></div><div><span>© 2026 M-TRANS.BY</span><a href="https://taxi.m-trans.by/politika-personalnyh-dannyh">Политика обработки данных</a></div></footer>
  </main>;
}
