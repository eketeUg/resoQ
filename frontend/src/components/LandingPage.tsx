"use client";

import React from "react";
import {
  TrendingUp,
  Scale,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Zap,
  Lock,
  Layers,
  Activity,
  BarChart3,
  ExternalLink,
  ChevronRight,
  Terminal,
  RefreshCw,
  Sliders,
  CheckCircle2,
} from "lucide-react";
import { OpportunityScore } from "../lib/types";

interface LandingPageProps {
  onLaunchApp: () => void;
  opportunities: OpportunityScore[];
  tvl: number;
  netApy: number;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onLaunchApp,
  opportunities,
  tvl,
  netApy,
}) => {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-300">
      {/* Background Ambient Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-mesh-glow pointer-events-none opacity-80" />
      <div className="absolute top-96 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="border-b border-cyan-500/20 bg-gradient-to-r from-cyan-950/40 via-surface/80 to-blue-950/40 py-2.5 px-4 text-center text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-center space-x-2">
          <span className="px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[10px] font-mono font-semibold uppercase">
            Crypto World's Fair 2026
          </span>
          <span className="text-gray-300 hidden sm:inline">
            Built for the Colosseum Accelerator & Hyperliquid Track.
          </span>
          <a
            href="https://colosseum.com/worldsfair"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center space-x-0.5 ml-1 transition-colors"
          >
            <span>Learn more</span>
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>

      {/* 2. HERO SECTION */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        {/* Network & Status Badge */}
        <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full glass-panel border-cyan-500/30 mb-8 shadow-radiant-sm">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-xs font-mono text-cyan-300 font-medium tracking-wide">
            Hyperliquid L1 Native • Autonomous Delta-Neutral Agent
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight max-w-5xl mx-auto leading-[1.1]">
          Institutional Yield with <br />
          <span className="radiant-text-gradient">Zero Directional Risk</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          <span className="text-white font-semibold">resoQ</span> is an autonomous quantitative agent on{" "}
          <span className="text-cyan-400">Hyperliquid L1</span> that captures 20% to 50%+ annualized perp funding rates by maintaining mathematically balanced basis pairs (
          <span className="font-mono text-emerald-400 font-semibold">Δ = 0.00</span>) with continuous risk shields.
        </p>

        {/* CTA Actions */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onLaunchApp}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold text-base shadow-radiant-glow hover:shadow-cyan-500/40 transition-all flex items-center justify-center space-x-2 group"
          >
            <span>Launch Live Agent Terminal</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          <a
            href="#how-it-works"
            className="w-full sm:w-auto px-7 py-4 rounded-xl glass-panel hover:border-cyan-500/40 text-gray-300 hover:text-white font-semibold text-base transition-all flex items-center justify-center space-x-2"
          >
            <span>How It Works</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </a>
        </div>

        {/* Live Metrics Ticker Banner */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          <div className="glass-panel-glow rounded-xl p-4 text-left">
            <span className="text-xs text-gray-400 font-mono block">Current Portfolio APY</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-cyan-400 mt-1">
              +{netApy}%
            </div>
            <span className="text-[11px] text-emerald-400 font-mono mt-1 block">Auto-Compounding Yield</span>
          </div>

          <div className="glass-panel-glow rounded-xl p-4 text-left">
            <span className="text-xs text-gray-400 font-mono block">Net Directional Delta</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-emerald-400 mt-1">
              Δ = 0.0000
            </div>
            <span className="text-[11px] text-gray-400 font-mono mt-1 block">Zero Price Exposure</span>
          </div>

          <div className="glass-panel-glow rounded-xl p-4 text-left">
            <span className="text-xs text-gray-400 font-mono block">Active Vault TVL</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-white mt-1">
              ${tvl.toLocaleString("en-US", { minimumFractionDigits: 0 })}
            </div>
            <span className="text-[11px] text-indigo-400 font-mono mt-1 block">Simulated Testnet Liquidity</span>
          </div>

          <div className="glass-panel-glow rounded-xl p-4 text-left">
            <span className="text-xs text-gray-400 font-mono block">L1 Execution Engine</span>
            <div className="text-2xl sm:text-3xl font-bold font-mono text-purple-300 mt-1">
              &lt; 200ms
            </div>
            <span className="text-[11px] text-cyan-300 font-mono mt-1 block">Hyperliquid Consensus</span>
          </div>
        </div>
      </section>

      {/* 3. THE PROBLEM & THE SOLUTION */}
      <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-borderDark/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
            Quantitative Foundation
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Why High Perp Funding Rates Go Uncaptured
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base">
            On decentralized perpetual exchanges, long traders pay short traders a continuous funding fee every hour. While APRs on tokens like HYPE, SUI, and SOL frequently hit 30%+, capturing them manually is dangerous.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* The Old Way */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border-red-500/20 relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-red-950/60 border border-red-500/30 flex items-center justify-center text-red-400 font-bold">
                ✕
              </div>
              <h3 className="text-lg font-bold text-white">Manual Basis Trading Pitfalls</h3>
            </div>
            <ul className="space-y-3.5 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span><strong>Basis Drift:</strong> Price swings unbalance spot and perp ratios, creating unintended long/short directional exposure.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span><strong>Funding Inversion Trap:</strong> When funding turns negative, shorts start paying longs, draining capital while you sleep.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-red-400 font-bold mt-0.5">•</span>
                <span><strong>Liquidation Risk:</strong> Unmonitored leverage spikes lead to cascading margin calls on volatile tokens.</span>
              </li>
            </ul>
          </div>

          {/* The resoQ Way */}
          <div className="glass-panel-glow rounded-2xl p-6 sm:p-8 border-cyan-500/30 relative">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                ✓
              </div>
              <h3 className="text-lg font-bold text-white">The resoQ Autonomous Advantage</h3>
            </div>
            <ul className="space-y-3.5 text-sm text-gray-300">
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold mt-0.5">•</span>
                <span><strong>Automated 1:1 Token Sizing:</strong> Allocates exact 50% Spot Long + 50% 1x Perp Short to guarantee Δ = 0.0000.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold mt-0.5">•</span>
                <span><strong>Real-time Inversion Shield:</strong> Instant circuit breaker unwinds positions if funding flips negative.</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-cyan-400 font-bold mt-0.5">•</span>
                <span><strong>Autonomous Micro-Rebalancing:</strong> Continuously syncs orderbook weights every 3.5 seconds on Hyperliquid.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 4. FOUR CORE PILLARS */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-borderDark/60">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
            Agent Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
            Engineered for Sub-Second Precision
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Pillar 1 */}
          <div className="glass-panel rounded-xl p-6 hover:border-cyan-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">1. Opportunity Radar</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Scans all Hyperliquid perp and spot orderbooks in real time, calculating hourly funding rates, 24h volume, and liquidity depth.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-panel rounded-xl p-6 hover:border-emerald-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-emerald-950/60 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">2. Delta Neutrality Engine</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Calculates precise token sizing for Spot Longs and Perp Shorts, neutralizing directional market exposure down to Δ = 0.0000.
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-panel rounded-xl p-6 hover:border-purple-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">3. Autonomous Risk Shield</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Protects against margin degradation and liquidation with automatic 1-click circuit breakers and funding inversion exits.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="glass-panel rounded-xl p-6 hover:border-indigo-500/40 transition-all group">
            <div className="w-10 h-10 rounded-lg bg-indigo-950/60 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-2">4. Live Reasoning Terminal</h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Every decision, scan, and rebalance is converted into human-readable quantitative reasoning logs streamed live over WebSockets.
            </p>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE OPPORTUNITY PREVIEW */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-borderDark/60">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
              Live Hyperliquid Radar
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-1 text-white">
              Real-Time Funding Yield Rankings
            </h2>
          </div>
          <button
            onClick={onLaunchApp}
            className="mt-4 md:mt-0 inline-flex items-center space-x-1 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            <span>Open in Terminal</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>

        <div className="glass-panel-glow rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-surfaceLight/50 text-gray-400 border-b border-borderDark uppercase text-[10px]">
                <tr>
                  <th className="px-4 py-3">Asset</th>
                  <th className="px-4 py-3">Mark Price</th>
                  <th className="px-4 py-3">1-Hour Funding</th>
                  <th className="px-4 py-3 text-cyan-400 font-semibold">Annualized APY</th>
                  <th className="px-4 py-3">Open Interest</th>
                  <th className="px-4 py-3 text-right">Autonomous Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-borderDark/40 text-gray-200">
                {opportunities.slice(0, 5).map((opp, idx) => (
                  <tr key={opp.coin} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-4 py-3.5 font-bold text-white flex items-center space-x-2">
                      <span>{opp.coin}</span>
                      {idx === 0 && (
                        <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/40">
                          TOP SPREAD
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-gray-300">${opp.price.toFixed(opp.price < 1 ? 4 : 2)}</td>
                    <td className="px-4 py-3.5 text-emerald-400 font-semibold">+{(opp.fundingRateHourly * 100).toFixed(4)}%</td>
                    <td className="px-4 py-3.5 text-cyan-300 font-bold text-sm">+{opp.annualizedApy}%</td>
                    <td className="px-4 py-3.5 text-gray-400">${(opp.openInterestUsd / 1e6).toFixed(1)}M</td>
                    <td className="px-4 py-3.5 text-right">
                      <span className="px-2.5 py-1 rounded bg-surfaceLight border border-borderDark text-gray-300 text-[11px]">
                        50% Spot / 50% 1x Short
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        <div className="glass-panel-glow rounded-3xl p-8 sm:p-12 border-cyan-500/40 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

          <span className="text-xs font-mono uppercase text-cyan-400 font-semibold tracking-wider">
            Ready to deploy capital?
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold mt-3 text-white">
            Experience Autonomous Yield on <br />
            <span className="radiant-text-gradient">Hyperliquid L1</span>
          </h2>
          <p className="mt-4 text-gray-300 max-w-xl mx-auto text-sm sm:text-base">
            Zero directional exposure. Automated rebalancing. Real-time L1 quantitative telemetry.
          </p>

          <div className="mt-8 flex justify-center">
            <button
              onClick={onLaunchApp}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-base shadow-radiant-glow transition-all flex items-center space-x-2 group"
            >
              <span>Launch resoQ Terminal</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="border-t border-borderDark/60 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-white text-[10px]">
            rQ
          </div>
          <span className="font-semibold text-gray-400">resoQ Protocol</span>
          <span>•</span>
          <span>Crypto World's Fair 2026 Submission</span>
        </div>
        <div className="mt-4 sm:mt-0 flex items-center space-x-4">
          <a href="https://colosseum.com/worldsfair" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            Colosseum Hackathon
          </a>
          <a href="https://hyperliquid.xyz" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            Hyperliquid L1
          </a>
          <button onClick={onLaunchApp} className="text-cyan-400 hover:text-cyan-300 font-semibold">
            Open App
          </button>
        </div>
      </footer>
    </div>
  );
};
