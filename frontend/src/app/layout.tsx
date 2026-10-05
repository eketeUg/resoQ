import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "resoQ — Autonomous Delta-Neutral Yield Agent on Hyperliquid",
  description: "Autonomous basis arbitrage, dynamic delta-neutral hedging, and automated risk management on Hyperliquid L1.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/favicon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#030712] text-slate-100 antialiased">{children}</body>
    </html>
  );
}
