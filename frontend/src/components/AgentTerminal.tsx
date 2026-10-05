"use client";

import React, { useRef, useEffect } from "react";
import { Terminal, Cpu, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import { AgentLog } from "../lib/types";

interface AgentTerminalProps {
  logs: AgentLog[];
}

export const AgentTerminal: React.FC<AgentTerminalProps> = ({ logs }) => {
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const getCategoryBadge = (category: AgentLog["category"]) => {
    switch (category) {
      case "DISCOVERY":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950 text-cyan-400 border border-cyan-500/40 font-semibold">SCAN</span>;
      case "HEDGE_EXECUTION":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-500/40 font-semibold">HEDGE</span>;
      case "REBALANCE":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-purple-950 text-purple-400 border border-purple-500/40 font-semibold">REBALANCE</span>;
      case "RISK_CHECK":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-400 border border-blue-500/40 font-semibold">RISK_SHIELD</span>;
      case "YIELD_HARVEST":
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950 text-amber-300 border border-amber-500/40 font-semibold">HARVEST</span>;
      default:
        return <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-gray-800 text-gray-300">LOG</span>;
    }
  };

  return (
    <div className="glass-panel-glow rounded-2xl overflow-hidden shadow-radiant-sm flex flex-col h-[400px]">
      <div className="px-4 py-3 bg-surfaceLight/80 border-b border-borderDark flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <div className="flex items-center space-x-2 ml-2">
            <Cpu className="w-4 h-4 text-cyan-400" />
            <span className="text-xs font-mono text-gray-200 font-bold">
              resoQ Autonomous Reasoning & L1 Execution Stream
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-[11px] font-mono text-cyan-400">
          <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="hidden sm:inline">Sub-second Stream</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-2.5 bg-[#050811]/90">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start space-x-3 py-1.5 border-b border-white/[0.03] hover:bg-white/[0.03] px-2 rounded-lg transition-all"
          >
            <span className="text-gray-500 text-[11px] shrink-0 pt-0.5">{log.timestamp}</span>
            <div className="shrink-0">{getCategoryBadge(log.category)}</div>
            <p className="text-gray-200 leading-relaxed font-mono flex-1 text-[11.5px]">
              {log.message}
            </p>
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
    </div>
  );
};
