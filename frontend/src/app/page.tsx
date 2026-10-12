"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { LandingPage } from "../components/LandingPage";
import { YieldOverview } from "../components/YieldOverview";
import { AgentTerminal } from "../components/AgentTerminal";
import { OpportunityRadar } from "../components/OpportunityRadar";
import { ActivePositions } from "../components/ActivePositions";
import { StrategyControls } from "../components/StrategyControls";
import { WalletModal } from "../components/WalletModal";
import { useAgentStream } from "../hooks/useAgentStream";
import { Wallet, Sparkles } from "lucide-react";

export default function AppRoot() {
  const [currentView, setCurrentView] = useState<"landing" | "terminal">("landing");
  // Starts DISCONNECTED by default
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  // Pass walletAddress to stream so balances are dynamic and personalized
  const {
    isConnected,
    telemetry,
    logs,
    opportunities,
    positions,
    deposit,
    setRiskTolerance,
    emergencyUnwind,
  } = useAgentStream(walletAddress);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 font-sans selection:bg-cyan-500/30 selection:text-cyan-300">
      <Navbar
        isConnected={isConnected}
        tvl={telemetry.tvl}
        currentView={currentView}
        onViewChange={setCurrentView}
        walletAddress={walletAddress}
        onConnectWallet={(addr) => setWalletAddress(addr)}
        onDisconnectWallet={() => setWalletAddress(null)}
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
          {/* Prompt to Connect Wallet if not connected */}
          {!walletAddress && (
            <div className="glass-panel-glow rounded-2xl p-4 sm:p-5 border-cyan-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in shadow-radiant-sm">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-500/40">
                  <Wallet className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Wallet Not Connected</h3>
                  <p className="text-xs text-gray-400 font-mono">
                    Connect your Web3 wallet (or choose a 1-click testnet demo account) to deposit and start earning funding yield.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-radiant-sm flex items-center space-x-1.5 whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Connect Wallet</span>
              </button>
            </div>
          )}

          {/* Top Row: Account Balance & Performance Banner */}
          <YieldOverview telemetry={telemetry} walletAddress={walletAddress} />

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
            onHedge={(coin) => {
              if (!walletAddress) {
                setIsWalletModalOpen(true);
              } else {
                deposit(10000);
              }
            }}
          />

          {/* Capital Controls & Risk Guard Slider */}
          <StrategyControls
            onDeposit={(amount) => {
              if (!walletAddress) {
                setIsWalletModalOpen(true);
              } else {
                deposit(amount);
              }
            }}
            onRiskChange={setRiskTolerance}
            onUnwind={emergencyUnwind}
          />
        </main>
      )}

      {/* Global Wallet Modal for prompt triggers */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onConnect={(addr) => {
          setWalletAddress(addr);
          setIsWalletModalOpen(false);
        }}
      />
    </div>
  );
}
