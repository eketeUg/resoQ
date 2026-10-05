"use client";

import React from "react";
import { Layers, Shield, RefreshCw } from "lucide-react";
import { PositionPair } from "../lib/types";

interface ActivePositionsProps {
  positions: PositionPair[];
}

export const ActivePositions: React.FC<ActivePositionsProps> = ({ positions }) => {
  return (
    <div className="glass-panel-glow rounded-2xl overflow-hidden flex flex-col h-[400px]">
      <div className="px-5 py-3.5 border-b border-borderDark flex items-center justify-between bg-surfaceLight/60">
        <div className="flex items-center space-x-2.5">
          <Layers className="w-4 h-4 text-emerald-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Active Basis Pairs (Spot Long + 1x Short)
          </h3>
        </div>
        <span className="text-xs text-emerald-400 font-mono font-medium">
          Δ = 0.0000 Neutral
        </span>
      </div>

      <div className="p-4 overflow-y-auto space-y-3.5 bg-[#050811]/90 flex-1">
        {positions.map((pos) => (
          <div
            key={pos.id}
            className="p-4 rounded-xl bg-surfaceLight/40 border border-borderDark/80 hover:border-cyan-500/40 transition-all font-mono"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-base font-bold text-white">{pos.asset}</span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/30 font-semibold">
                  {pos.status}
                </span>
              </div>
              <span className="text-xs text-cyan-300 font-bold">+{pos.annualizedApy}% APY</span>
            </div>

            <div className="space-y-1.5 text-xs text-gray-300 my-2.5">
              <div className="flex justify-between">
                <span className="text-gray-400">Spot Long:</span>
                <span className="text-white font-medium">${pos.spotValueUsd.toLocaleString()} ({pos.spotAmount.toFixed(2)} tokens)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Perp 1x Short:</span>
                <span className="text-white font-medium">${pos.perpValueUsd.toLocaleString()} (-{pos.perpSize.toFixed(2)})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Pair Net Delta:</span>
                <span className="text-emerald-400 font-bold">Δ = {pos.netDelta.toFixed(4)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Funding Accrued:</span>
                <span className="text-cyan-300 font-bold">+${pos.cumulativeFundingEarned.toFixed(2)} USDC</span>
              </div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-borderDark/60 flex items-center justify-between text-[11px]">
              <span className="text-gray-400">Margin Health:</span>
              <span className="text-emerald-400 font-bold">{pos.marginHealth}% Optimal</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
