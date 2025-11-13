import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

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
      <body className="flex h-screen flex-col">
        <CounterStoreProvider>{children}</CounterStoreProvider>
        {/* <footer className="text-foreground-muted text-center text-xs"> */}
        {/*   <p> */}
        {/*     {"created by "} */}
        {/*     <a */}
        {/*       className="transition-color ease-out duration-250 cursor-pointer hover:text-foreground" */}
        {/*       href="https://www.instagram.com/crafty_stitchess/" */}
        {/*       target="_blank" */}
        {/*     > */}
        {/*       @crafty_stitchess */}
        {/*     </a> */}
        {/*   </p> */}
        {/* </footer> */}
      </body>
    </html>
  );
}
