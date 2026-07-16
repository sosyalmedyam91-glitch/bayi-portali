import "./globals.css";
import { Providers } from "./providers";
import localFont from "next/font/local";

const dinPro = localFont({
  src: [
    {
      path: "../public/fonts/DINPro-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/DINPro-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-din",
});

export const metadata = {
  title: "EYS Portal",
  description: "EYS İç Portal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${dinPro.variable}`} suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
