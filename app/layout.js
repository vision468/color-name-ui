import "./globals.css";
import { Amiri } from "next/font/google";

const inter = Amiri({ subsets: ["latin"], weight: "700" });

export const metadata = {
  title: "Color Name App",
  description: "پیدا کردن نام رنگ با کد HEX",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <head>
        <meta
          name="keywords"
          content="رنگ,رنگ به فارسی,نام رنگ, کد رنگ, تبدیل کد به نام رنگ, رنگ فارسی, پیدا کردن"
        />
        <meta name="author" content="vision468" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
