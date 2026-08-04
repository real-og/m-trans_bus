import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Реклама на задней части автобуса в Беларуси | M-TRANS.BY",
  description: "Размещение рекламы на задней части автобусов по Беларуси. Дизайн, печать и оклейка под ключ. Запуск кампании от 3 дней.",
  keywords: ["реклама на автобусах", "реклама на задней части автобуса", "транзитная реклама Беларусь", "брендирование автобуса"],
  robots: { index: true, follow: true },
  openGraph: { title: "Реклама на задней части автобуса — M-TRANS.BY", description: "Мобильный билборд на колёсах, который работает до 17 часов в сутки.", type: "website", locale: "ru_BY", images: [{ url: "/hero-bus.webp", width: 1568, height: 1003, alt: "Реклама на задней части автобуса" }] },
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

const schema = { "@context": "https://schema.org", "@type": "ProfessionalService", name: "M-TRANS.BY", description: "Размещение рекламы на задней части автобусов по Беларуси", telephone: "+375296065651", email: "info@m-trans.by", areaServed: { "@type": "Country", name: "Беларусь" }, sameAs: ["https://t.me/M_TRANS_BY"] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
