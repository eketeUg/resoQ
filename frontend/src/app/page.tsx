"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { LandingPage } from "../components/LandingPage";
import { YieldOverview } from "../components/YieldOverview";
import { AgentTerminal } from "../components/AgentTerminal";
import { OpportunityRadar } from "../components/OpportunityRadar";
import { ActivePositions } from "../components/ActivePositions";
import { StrategyControls } from "../components/StrategyControls";
import { useAgentStream } from "../hooks/useAgentStream";

export default function AppRoot() {
  const [currentView, setCurrentView] = useState<"landing" | "terminal">("landing");

  const {
    isConnected,
    telemetry,
    logs,
    opportunities,
    positions,
    deposit,
    setRiskTolerance,
    emergencyUnwind,
  } = useAgentStream();

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      <Navbar
        isConnected={isConnected}
        tvl={telemetry.tvl}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {currentView === "landing" ? (
        <LandingPage
          onLaunchApp={() => setCurrentView("terminal")}
          opportunities={opportunities}
          tvl={telemetry.tvl}
          netApy={telemetry.netApy}
        />
      ) : (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-16 space-y-6">
          {/* Top Row: Yield, Delta & TVL Analytics */}
          <YieldOverview telemetry={telemetry} />

          {/* Middle Row: Live Agent Reasoning Feed + Active Basis Pairs */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <AgentTerminal logs={logs} />
            </div>
            <div className="lg:col-span-5">
              <ActivePositions positions={positions} />
            </div>
          </div>

          {/* Opportunity Radar Table */}
          <OpportunityRadar
            opportunities={opportunities}
            onHedge={(coin) => deposit(10000)}
          />

          {/* Capital Controls & Risk Guard Slider */}
          <StrategyControls
            onDeposit={deposit}
            onRiskChange={setRiskTolerance}
            onUnwind={emergencyUnwind}
          />
        </main>
      )}
    </div>
  );
}
