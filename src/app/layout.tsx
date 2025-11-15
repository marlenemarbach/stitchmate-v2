import type { Metadata } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import "./globals.css";

import { CounterStoreProvider } from "@/providers/CounterStoreProvider";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stitchmate",
  description: "Your knitting companion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${sourceSerif.variable}`}
    >
      <body className="flex h-screen w-screen flex-col bg-background font-sans text-foreground">
        <CounterStoreProvider>{children}</CounterStoreProvider>
        <footer className="pt-4 pb-8 text-center text-xs text-muted">
          <p>
            {"created by "}
            <a
              className="transition-color cursor-pointer duration-250 ease-out hover:text-foreground"
              href="https://www.instagram.com/crafty_stitchess/"
              target="_blank"
            >
              @crafty_stitchess
            </a>
          </p>
        </footer>
      </body>
    </html>
  );
}
