import { Crimson_Pro, DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Footer } from "./components/Footer";
import "./globals.css";

const crimson = Crimson_Pro({
  variable: "--font-crimson",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
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
    <html lang="en" className={`${crimson.variable} ${dmSans.variable}`}>
      <body className="flex h-screen w-screen flex-col bg-background font-display tracking-normal text-foreground dark:tracking-wide">
        {children}
        <Footer />
      </body>
    </html>
  );
}
