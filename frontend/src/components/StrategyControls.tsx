"use client";

import React, { useState } from "react";
import { Sliders, PlusCircle, AlertOctagon, Check, ShieldCheck } from "lucide-react";

interface StrategyControlsProps {
  onDeposit: (amount: number) => void;
  onRiskChange: (risk: "CONSERVATIVE" | "BALANCED" | "AGGRESSIVE") => void;
  onUnwind: () => void;
}

export const StrategyControls: React.FC<StrategyControlsProps> = ({
  onDeposit,
  onRiskChange,
  onUnwind,
}) => {
  const [depositAmount, setDepositAmount] = useState<string>("5000");
  const [selectedRisk, setSelectedRisk] = useState<"CONSERVATIVE" | "BALANCED" | "AGGRESSIVE">("BALANCED");
  const [depositSuccess, setDepositSuccess] = useState(false);

  const handleDepositSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(depositAmount);
    if (!isNaN(val) && val > 0) {
      onDeposit(val);
      setDepositSuccess(true);
      setTimeout(() => setDepositSuccess(false), 2500);
    }
  };

  return (
    <div className="glass-panel-glow rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-borderDark pb-3">
        <div className="flex items-center space-x-2.5">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <h3 className="text-sm font-bold text-white tracking-wide">
            Autonomous Agent Strategy Parameters & Vault Controls
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 1. Deposit Box */}
        <form onSubmit={handleDepositSubmit} className="space-y-2.5">
          <label className="text-xs font-semibold text-gray-300 block font-mono">
            Simulate Capital Injection (USDC)
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              value={depositAmount}
              onChange={(e) => setDepositAmount(e.target.value)}
              className="flex-1 bg-surfaceLight/80 border border-borderDark rounded-xl px-3.5 py-2 text-xs text-white font-mono focus:outline-none focus:border-cyan-500 shadow-inner"
              placeholder="5000"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all flex items-center space-x-1.5 shadow-radiant-sm"
            >
              {depositSuccess ? <Check className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
              <span>{depositSuccess ? "Injected!" : "Deposit"}</span>
            </button>
          </div>
        </form>

        {/* 2. Risk Policy Slider */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-gray-300 block font-mono">
            Autonomous Risk Policy
          </label>
          <div className="grid grid-cols-3 gap-2 font-mono text-xs">
            {(["CONSERVATIVE", "BALANCED", "AGGRESSIVE"] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setSelectedRisk(r);
                  onRiskChange(r);
                }}
                className={`py-2 rounded-xl border text-center transition-all font-semibold ${
                  selectedRisk === r
                    ? "bg-cyan-950/80 border-cyan-500 text-cyan-300 shadow-radiant-sm font-bold"
                    : "bg-surfaceLight/40 border-borderDark text-gray-400 hover:bg-surfaceLight/80"
                }`}
              >
                {r === "CONSERVATIVE" ? "Cons." : r === "BALANCED" ? "Bal." : "Aggr."}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Emergency Circuit Breaker */}
        <div className="space-y-2.5">
          <label className="text-xs font-semibold text-gray-300 block font-mono">
            Emergency Circuit Breaker
          </label>
          <button
            onClick={onUnwind}
            type="button"
            className="w-full py-2 rounded-xl bg-red-950/80 hover:bg-red-900 border border-red-500/50 text-red-300 font-bold text-xs transition-all flex items-center justify-center space-x-2 shadow-sm"
          >
            <AlertOctagon className="w-4 h-4 text-red-400" />
            <span>Emergency 1-Click Unwind</span>
          </button>
        </div>
      </div>
    </div>
  );
};
