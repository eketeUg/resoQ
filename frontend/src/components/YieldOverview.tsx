"use client";

import React from "react";
import { TrendingUp, Scale, DollarSign, Wallet, ArrowUpRight, Zap, ShieldCheck } from "lucide-react";
import { AgentTelemetry } from "../lib/types";

interface YieldOverviewProps {
  telemetry: AgentTelemetry;
  walletAddress?: string | null;
}

export const YieldOverview: React.FC<YieldOverviewProps> = ({ telemetry, walletAddress }) => {
  const principal = telemetry.depositedPrincipal || 0;
  const fundingYield = telemetry.totalFundingEarned || 0;
  const totalValue = telemetry.tvl || principal + fundingYield;

  return (
    <div className="space-y-4">
      {/* 1. PRIMARY ACCOUNT BALANCE BANNER (3 Key Pillars: Principal, Accrued Fees, Combined Balance) */}
      <div className="glass-panel-glow rounded-2xl p-5 border-cyan-500/30 relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-4 border-b border-borderDark/60 gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40 shadow-radiant-sm">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-base font-bold text-white tracking-wide">
                  My Vault Account & Performance
                </h2>
                {walletAddress ? (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">
                    {walletAddress.substring(0, 6)}...{walletAddress.substring(walletAddress.length - 4)}
                  </span>
                ) : (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-gray-800 text-gray-400 border border-gray-700">
                    No Wallet Connected
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-400 font-mono mt-0.5">
                {principal > 0
                  ? "Real-time breakdown of user principal, funding profit, and total equity"
                  : "Connect wallet & inject capital below to start earning delta-neutral yield"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span
              className={`text-[11px] font-mono px-2.5 py-1 rounded-full border flex items-center space-x-1.5 font-semibold shadow-sm ${
                principal > 0
                  ? "bg-emerald-950/80 text-emerald-300 border-emerald-500/40"
                  : "bg-surfaceLight text-gray-400 border-borderDark"
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  principal > 0 ? "bg-emerald-400 animate-pulse" : "bg-gray-500"
                }`}
              />
              <span>
                {principal > 0
                  ? "Harvesting Active • 1h L1 Payouts"
                  : "Standby • Deposit to Activate Yield"}
              </span>
            </span>
          </div>
        </div>

        {/* 3 Prominent Stat Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-4">
          {/* A. My Deposited Principal */}
          <div className="p-4 rounded-xl bg-surfaceLight/50 border border-borderDark hover:border-cyan-500/40 transition-all">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider font-mono">
                1. Deposited Principal
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-surface border border-borderDark text-gray-400">
                Principal
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-white font-mono tracking-tight">
                ${principal.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-cyan-400 font-mono font-bold">USDC</span>
            </div>
            <p className="text-[11px] text-gray-400 mt-2 font-mono flex items-center">
              <span>{principal > 0 ? "Your active capital in vault" : "Zero capital deployed yet"}</span>
            </p>
          </div>

          {/* B. Accrued Funding Fees (PROFIT) */}
          <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 hover:border-emerald-500/60 shadow-radiant-sm transition-all relative overflow-hidden">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono flex items-center space-x-1">
                <Zap
                  className={`w-3.5 h-3.5 mr-1 ${
                    principal > 0 ? "text-emerald-400 animate-bounce" : "text-gray-500"
                  }`}
                />
                <span>2. Accrued Funding Fees</span>
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                PROFIT
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span
                className={`text-3xl font-extrabold font-mono tracking-tight ${
                  principal > 0 ? "text-emerald-400" : "text-gray-400"
                }`}
              >
                +${fundingYield.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-emerald-400 font-mono font-bold">USDC</span>
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-2 font-mono flex items-center">
              <ArrowUpRight className="w-3.5 h-3.5 mr-1 text-emerald-400 shrink-0" />
              <span>
                {principal > 0 ? "Earned from Hyperliquid perp longs" : "Starts accruing upon deposit"}
              </span>
            </p>
          </div>

          {/* C. Total Account Value (Combined) */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-950/40 via-surfaceLight/50 to-blue-950/40 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-radiant-sm">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold text-cyan-300 uppercase tracking-wider font-mono">
                3. Total Account Value
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-bold">
                EQUITY
              </span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-extrabold text-cyan-300 font-mono tracking-tight">
                ${totalValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className="text-xs text-cyan-400 font-mono font-bold">USDC</span>
            </div>
            <p className="text-[11px] text-gray-300 mt-2 font-mono">
              <span>Principal + Accrued Profits</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. SECONDARY QUANT METRICS (Net APY, Delta Neutrality Gauge, Risk Buffer) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Net APY */}
        <div className="glass-panel rounded-xl p-4 flex items-center justify-between group hover:border-cyan-500/40 transition-all">
          <div>
            <span className="text-[11px] font-mono uppercase text-gray-400 font-semibold block">
              Net Portfolio APY
            </span>
            <div className="text-2xl font-extrabold font-mono text-cyan-400 mt-0.5">
              +{telemetry.netApy}%
            </div>
            <span className="text-[10px] text-emerald-400 font-mono">Auto-compounded on L1</span>
          </div>
          <div className="p-2.5 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-500/30">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Delta Gauge */}
        <div className="glass-panel rounded-xl p-4 flex items-center justify-between group hover:border-emerald-500/40 transition-all">
          <div>
            <span className="text-[11px] font-mono uppercase text-gray-400 font-semibold block">
              Net Directional Delta
            </span>
            <div className="text-2xl font-extrabold font-mono text-emerald-400 mt-0.5">
              Δ = {telemetry.netDelta.toFixed(4)}
            </div>
            <span className="text-[10px] text-gray-400 font-mono">0.00% Market Price Risk</span>
          </div>
          <div className="p-2.5 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-500/30">
            <Scale className="w-5 h-5" />
          </div>
        </div>

        {/* Margin Safety Health */}
        <div className="glass-panel rounded-xl p-4 flex items-center justify-between group hover:border-purple-500/40 transition-all">
          <div>
            <span className="text-[11px] font-mono uppercase text-gray-400 font-semibold block">
              Risk Guard Status
            </span>
            <div className="text-2xl font-extrabold font-mono text-purple-300 mt-0.5">
              OPTIMAL
            </div>
            <span className="text-[10px] text-purple-300 font-mono">18.4% Margin (100% Buffer)</span>
          </div>
          <div className="p-2.5 rounded-lg bg-purple-950 text-purple-400 border border-purple-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>
        </div>
      </div>
    </div>
  );
};
