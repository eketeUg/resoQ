"use client";

import React from "react";
import { TrendingUp, Scale, DollarSign, ShieldAlert, Zap } from "lucide-react";
import { AgentTelemetry } from "../lib/types";

interface YieldOverviewProps {
  telemetry: AgentTelemetry;
}

export const YieldOverview: React.FC<YieldOverviewProps> = ({ telemetry }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 1. Net APY Card */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-cyan-500/50 hover:shadow-radiant-sm transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
            Net Portfolio APY
          </span>
          <div className="p-2 rounded-lg bg-cyan-950/80 text-cyan-400 border border-cyan-500/30">
            <TrendingUp className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-cyan-400 font-mono tracking-tight">
            +{telemetry.netApy}%
          </span>
          <span className="text-[11px] text-emerald-400 font-mono font-medium">Auto-Compounding</span>
        </div>
        <div className="mt-3 flex items-center text-xs text-gray-400">
          <Zap className="w-3.5 h-3.5 text-cyan-400 mr-1.5 shrink-0" />
          <span>Hourly funding distributions on L1</span>
        </div>
        <div className="absolute top-0 right-0 w-28 h-28 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 2. Delta Neutrality Gauge */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/50 hover:shadow-radiant-sm transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
            Net Market Delta
          </span>
          <div className="p-2 rounded-lg bg-emerald-950/80 text-emerald-400 border border-emerald-500/30">
            <Scale className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-emerald-400 font-mono tracking-tight">
            Δ = {telemetry.netDelta.toFixed(4)}
          </span>
          <span className="text-[11px] text-gray-400 font-mono">Equilibrium</span>
        </div>
        <div className="mt-3 flex items-center text-xs text-emerald-400">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 shrink-0 animate-pulse" />
          <span>0.00% Directional Market Risk</span>
        </div>
        <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 3. Cumulative Funding Yield */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-blue-500/50 hover:shadow-radiant-sm transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
            Accrued Funding Yield
          </span>
          <div className="p-2 rounded-lg bg-blue-950/80 text-blue-400 border border-blue-500/30">
            <DollarSign className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
            ${telemetry.totalFundingEarned.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </span>
          <span className="text-[11px] text-blue-400 font-mono">USDC</span>
        </div>
        <div className="mt-3 flex items-center text-xs text-gray-400">
          <span>Captured every 60 mins from long traders</span>
        </div>
        <div className="absolute top-0 right-0 w-28 h-28 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* 4. Risk Guard & Health Status */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/50 hover:shadow-radiant-sm transition-all">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
            Risk Shield Status
          </span>
          <div className="p-2 rounded-lg bg-purple-950/80 text-purple-400 border border-purple-500/30">
            <ShieldAlert className="w-4 h-4" />
          </div>
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-3xl font-extrabold text-purple-300 font-mono tracking-tight">
            {telemetry.status === "AUTONOMOUS_ACTIVE" ? "OPTIMAL" : telemetry.status}
          </span>
          <span className="text-[11px] text-emerald-400 font-mono font-medium">18.4% Margin</span>
        </div>
        <div className="mt-3 flex items-center text-xs text-gray-400">
          <span>Liquidation distance: &gt;99%</span>
        </div>
        <div className="absolute top-0 right-0 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>
    </div>
  );
};
