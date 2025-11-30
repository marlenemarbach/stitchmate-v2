import { CounterStoreProvider } from "@/providers/CounterStoreProvider";
import type { Metadata } from "next";
import { Crimson_Pro, DM_Sans } from "next/font/google";
import { Suspense } from "react";
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
      <body className="flex dark:tracking-wide h-screen w-screen tracking-normal flex-col bg-background font-display text-foreground">
        <Suspense fallback={<div>Loading...</div>}>
          <CounterStoreProvider>{children}</CounterStoreProvider>
        </Suspense>
      </body>
    </html>
  );
}
