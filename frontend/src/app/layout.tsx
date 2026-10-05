import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "resoQ — Autonomous Delta-Neutral Yield Agent on Hyperliquid",
  description: "Autonomous basis arbitrage, dynamic delta-neutral hedging, and automated risk management on Hyperliquid L1.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#090b10] text-gray-100 antialiased">{children}</body>
    </html>
  );
}
