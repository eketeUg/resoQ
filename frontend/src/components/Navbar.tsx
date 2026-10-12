"use client";

import React, { useState } from "react";
import {
  Activity,
  ShieldCheck,
  Cpu,
  Terminal,
  ExternalLink,
  Sparkles,
  LayoutDashboard,
  Wallet,
  ChevronDown,
  Copy,
  LogOut,
  Check,
} from "lucide-react";
import { WalletModal } from "./WalletModal";

interface NavbarProps {
  isConnected: boolean;
  tvl: number;
  currentView: "landing" | "terminal";
  onViewChange: (view: "landing" | "terminal") => void;
  walletAddress: string | null;
  onConnectWallet: (address: string) => void;
  onDisconnectWallet: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isConnected,
  tvl,
  currentView,
  onViewChange,
  walletAddress,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <>
      <header className="border-b border-borderDark/80 bg-[#030712]/90 backdrop-blur-xl sticky top-0 z-40">
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

          {/* Right Controls: TVL, Network Badge, and Connect Wallet */}
          <div className="flex items-center space-x-3">
            <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-surfaceLight border border-borderDark text-xs font-mono">
              <span className="text-gray-400">TVL:</span>
              <span className="text-emerald-400 font-semibold">
                ${tvl.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-xs">
              <div
                className={`w-2 h-2 rounded-full ${
                  isConnected ? "bg-emerald-400 animate-pulse" : "bg-amber-400"
                }`}
              />
              <span className="font-mono text-emerald-300 font-medium">
                {isConnected ? "Hyperliquid Testnet" : "Connecting..."}
              </span>
            </div>

            {/* Wallet Button */}
            {walletAddress ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="px-3 py-1.5 rounded-xl bg-surfaceLight border border-cyan-500/40 text-xs font-mono text-cyan-300 hover:border-cyan-400 transition-all flex items-center space-x-2 shadow-radiant-sm"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{formatAddress(walletAddress)}</span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl glass-panel-glow border-borderDark/80 p-2 text-xs font-mono shadow-2xl z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-borderDark/60 mb-1">
                      <span className="text-[10px] text-gray-400 uppercase block">Connected Wallet</span>
                      <span className="text-white font-bold block truncate">{walletAddress}</span>
                    </div>

                    <button
                      onClick={handleCopy}
                      className="w-full px-3 py-2 rounded-lg hover:bg-surfaceLight flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? "Copied!" : "Copy Address"}</span>
                      </div>
                    </button>

                    <a
                      href={`https://app.hyperliquid-testnet.xyz`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-3 py-2 rounded-lg hover:bg-surfaceLight flex items-center justify-between text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="flex items-center space-x-2">
                        <ExternalLink className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Hyperliquid Explorer</span>
                      </div>
                    </a>

                    <div className="border-t border-borderDark/60 my-1" />

                    <button
                      onClick={() => {
                        onDisconnectWallet();
                        setIsDropdownOpen(false);
                      }}
                      className="w-full px-3 py-2 rounded-lg hover:bg-red-950/40 text-red-400 flex items-center space-x-2 transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Disconnect</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs transition-all shadow-radiant-sm flex items-center space-x-1.5"
              >
                <Wallet className="w-3.5 h-3.5" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Wallet Modal */}
      <WalletModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConnect={onConnectWallet}
      />
    </>
  );
};
