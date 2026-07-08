import "./globals.css";
import { Providers } from "./providers";

console.log("ROOT LAYOUT ÇALIŞTI");

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
    <html lang="tr">
      <body>

        <Providers>
          {children}
        </Providers>

      </body>
    </html>
  );

}