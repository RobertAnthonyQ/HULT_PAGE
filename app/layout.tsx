import type { Metadata } from "next";
import { Oswald, JetBrains_Mono, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "700", "800"],
});

export const metadata: Metadata = {
  title: "Hult Prize PUCP",
  description: "Hult Prize at PUCP - The Nobel Prize for Students. Build profitable startups that solve the planet's most pressing issues.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oswald.variable} ${jetbrainsMono.variable} ${inter.variable} font-sans antialiased bg-void text-white overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
