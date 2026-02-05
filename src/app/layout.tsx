import { Suspense } from "react";
import { DM_Sans } from "next/font/google";
import type { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";

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
    <html lang="en" className={`${dmSans.variable}`}>
      <body className="flex min-h-screen w-screen flex-col bg-background font-display text-foreground">
        <Suspense>{children}</Suspense>
        <Toaster
          toastOptions={{
            style: {
              background: "var(--popup)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            },
          }}
        />
      </body>
    </html>
  );
}
