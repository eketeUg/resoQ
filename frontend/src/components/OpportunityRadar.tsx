"use client";

import React from "react";
import { Radar, ArrowUpRight, TrendingUp, DollarSign, Sparkles } from "lucide-react";
import { OpportunityScore } from "../lib/types";

interface OpportunityRadarProps {
  opportunities: OpportunityScore[];
  onHedge: (asset: string) => void;
}

export const OpportunityRadar: React.FC<OpportunityRadarProps> = ({ opportunities, onHedge }) => {
  return (
    <div className="glass-panel-glow rounded-2xl overflow-hidden">
      <div className="px-5 py-3.5 border-b border-borderDark flex items-center justify-between bg-surfaceLight/60">
        <div className="flex items-center space-x-2.5">
          <Radar className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Hyperliquid Opportunity Radar (Perpetual Funding Rate & Basis APY)
          </h3>
        </div>
        <span className="text-xs text-gray-400 font-mono">
          Scored by Funding APR + Volume Depth
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs font-mono">
          <thead className="bg-surfaceLight/40 text-gray-400 border-b border-borderDark uppercase text-[10px] tracking-wider">
            <tr>
              <th className="px-5 py-3">Asset</th>
              <th className="px-5 py-3">Mark Price</th>
              <th className="px-5 py-3">1-Hour Funding</th>
              <th className="px-5 py-3 text-cyan-400 font-bold">Annualized APY</th>
              <th className="px-5 py-3">Open Interest</th>
              <th className="px-5 py-3">Safety Score</th>
              <th className="px-5 py-3 text-right">Autonomous Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-borderDark/40 text-gray-200">
            {opportunities.map((opp, idx) => (
              <tr key={opp.coin} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-5 py-3.5 flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">{opp.coin}</span>
                  {idx === 0 && (
                    <span className="text-[9px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-semibold">
                      #1 YIELD
                    </span>
                  )}
                </td>
                <td className="px-5 py-3.5 font-semibold text-gray-300">
                  ${opp.price.toFixed(opp.price < 1 ? 4 : 2)}
                </td>
                <td className="px-5 py-3.5 text-emerald-400 font-semibold">
                  +{(opp.fundingRateHourly * 100).toFixed(4)}%
                </td>
                <td className="px-5 py-3.5 text-cyan-300 font-bold text-sm">
                  +{opp.annualizedApy}%
                </td>
                <td className="px-5 py-3.5 text-gray-400">
                  ${(opp.openInterestUsd / 1e6).toFixed(1)}M
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center space-x-2">
                    <div className="w-14 bg-gray-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-full rounded-full"
                        style={{ width: `${Math.min(100, opp.compositeScore)}%` }}
                      />
                    </div>
                    <span className="text-gray-300 text-[11px] font-semibold">{opp.compositeScore}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button
                    onClick={() => onHedge(opp.coin)}
                    className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-cyan-950 to-blue-950 hover:from-cyan-900 hover:to-blue-900 border border-cyan-500/40 text-cyan-300 text-[11px] font-semibold transition-all inline-flex items-center space-x-1 shadow-radiant-sm hover:shadow-cyan-500/30"
                  >
                    <span>Auto-Hedge</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
