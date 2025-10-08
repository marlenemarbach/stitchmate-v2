import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "./_components/Header";

import { CounterStoreProvider } from "@/providers/CounterStoreProvider";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
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
      className={sourceSerif.variable + " font-serif antialiased"}
    >
      <body className="flex flex-col h-screen w-full">
        <Header />
        <CounterStoreProvider>{children}</CounterStoreProvider>
        <footer className="text-white/50 text-center">
          <p>
            {"created by "}
            <a
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
