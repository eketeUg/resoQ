"use client";

import React from "react";
import { Activity, ShieldCheck, Cpu, Terminal, ExternalLink, Sparkles, LayoutDashboard } from "lucide-react";

interface NavbarProps {
  isConnected: boolean;
  tvl: number;
  currentView: "landing" | "terminal";
  onViewChange: (view: "landing" | "terminal") => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  tvl,
  currentView,
  onViewChange,
}) => {
  return (
    <header className="border-b border-borderDark/80 bg-[#030712]/90 backdrop-blur-xl sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div
          onClick={() => onViewChange("landing")}
          className="flex items-center space-x-3 cursor-pointer group"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-radiant-sm group-hover:shadow-radiant-glow transition-all">
            rQ
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-cyan-300 transition-colors">
                resoQ
              </span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/60 font-semibold">
                AI Agent
              </span>
            </div>
            <p className="text-[11px] text-gray-400 hidden sm:block font-mono">
              Delta-Neutral Yield on Hyperliquid
            </p>
          </div>
        </div>

        {/* View Switcher Tabs (Landing vs Terminal) */}
        <div className="flex items-center space-x-1 p-1 rounded-xl bg-surfaceLight/60 border border-borderDark text-xs font-mono">
          <button
            onClick={() => onViewChange("landing")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              currentView === "landing"
                ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold shadow-radiant-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Overview</span>
          </button>

          <button
            onClick={() => onViewChange("terminal")}
            className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
              currentView === "terminal"
                ? "bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-bold shadow-radiant-sm"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Terminal</span>
          </button>
        </div>

        {/* Actions & Status */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surfaceLight border border-borderDark text-xs font-mono">
            <span className="text-gray-400">TVL:</span>
            <span className="text-emerald-400 font-semibold">
              ${tvl.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs">
            <div
              className={`w-2 h-2 rounded-full ${
                isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
              }`}
            />
            <span className="font-mono text-emerald-300 font-medium hidden sm:inline">
              {isConnected ? "Hyperliquid Testnet" : "Connecting..."}
            </span>
          </div>

          <button
            onClick={() => onViewChange(currentView === "landing" ? "terminal" : "landing")}
            className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs transition-all shadow-radiant-sm flex items-center space-x-1"
          >
            <span>{currentView === "landing" ? "Launch Terminal" : "View Breakdown"}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
