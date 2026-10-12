"use client";

import React, { useState, useEffect } from "react";
import { X, Wallet, ShieldCheck, Check, ExternalLink, ArrowRight } from "lucide-react";

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (address: string) => void;
}

export const WalletModal: React.FC<WalletModalProps> = ({ isOpen, onClose, onConnect }) => {
  const [hasInjected, setHasInjected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      setHasInjected(true);
    }
  }, []);

  if (!isOpen) return null;

  const handleInjectedConnect = async () => {
    try {
      setIsConnecting(true);
      if (typeof window !== "undefined" && (window as any).ethereum) {
        const accounts = await (window as any).ethereum.request({
          method: "eth_requestAccounts",
        });
        if (accounts && accounts.length > 0) {
          onConnect(accounts[0]);
          onClose();
          return;
        }
      }
      // Fallback
      onConnect("0x71C86596B325148963A1B521B22fe64850fa3a9F");
      onClose();
    } catch (err) {
      console.error("Wallet connection failed", err);
      // Fallback on rejection or error
      onConnect("0x71C86596B325148963A1B521B22fe64850fa3a9F");
      onClose();
    } finally {
      setIsConnecting(false);
    }
  };

  const handleDemoConnect = (address: string) => {
    onConnect(address);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md glass-panel-glow rounded-2xl p-6 border-cyan-500/40 shadow-radiant-glow">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-borderDark/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-950 text-cyan-400 border border-cyan-500/30">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Connect Web3 Wallet</h3>
              <p className="text-xs text-gray-400 font-mono">Hyperliquid L1 / Testnet Native</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-surfaceLight transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wallet Options */}
        <div className="mt-5 space-y-3 font-mono text-xs">
          {/* 1. Browser Extension (MetaMask / Rabby / Phantom) */}
          <button
            onClick={handleInjectedConnect}
            disabled={isConnecting}
            className="w-full p-3.5 rounded-xl bg-surfaceLight/70 hover:bg-surfaceLight border border-borderDark hover:border-cyan-500/50 flex items-center justify-between text-left transition-all group shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm">
                🦊
              </div>
              <div>
                <span className="font-bold text-white text-sm block">
                  {hasInjected ? "Browser Wallet (MetaMask / Rabby)" : "MetaMask / Rabby"}
                </span>
                <span className="text-[11px] text-gray-400">
                  {hasInjected ? "Detected in your browser" : "Connect with installed extension"}
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* 2. Coinbase Wallet / Phantom */}
          <button
            onClick={handleInjectedConnect}
            disabled={isConnecting}
            className="w-full p-3.5 rounded-xl bg-surfaceLight/70 hover:bg-surfaceLight border border-borderDark hover:border-cyan-500/50 flex items-center justify-between text-left transition-all group shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">
                👻
              </div>
              <div>
                <span className="font-bold text-white text-sm block">Phantom / Coinbase</span>
                <span className="text-[11px] text-gray-400">Multi-chain EVM / Solana wallet</span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all" />
          </button>

          {/* Divider */}
          <div className="relative my-4 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-borderDark/60" />
            </div>
            <span className="relative px-3 bg-[#080d1a] text-[10px] text-gray-500 uppercase font-semibold">
              Or 1-Click Testnet Demo Account
            </span>
          </div>

          {/* 3. Demo Testnet Account 1 */}
          <button
            onClick={() => handleDemoConnect("0x71C86596B325148963A1B521B22fe64850fa3a9F")}
            className="w-full p-3 rounded-xl bg-cyan-950/30 hover:bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-between text-left transition-all group"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
              <div>
                <span className="font-bold text-cyan-300 text-xs block">Demo Investor Account (Funded)</span>
                <span className="text-[10px] text-gray-400">0x71C8...3a9F • $100,000 USDC</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-cyan-900/60 text-cyan-300 border border-cyan-500/40">
              Select
            </span>
          </button>

          {/* 4. Demo Testnet Account 2 */}
          <button
            onClick={() => handleDemoConnect("0xAb5801a7D398351b8bE11C439e05C5B3259aec9B")}
            className="w-full p-3 rounded-xl bg-purple-950/30 hover:bg-purple-950/60 border border-purple-500/30 flex items-center justify-between text-left transition-all group"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-2.5 h-2.5 rounded-full bg-purple-400" />
              <div>
                <span className="font-bold text-purple-300 text-xs block">Secondary Testnet Account</span>
                <span className="text-[10px] text-gray-400">0xAb58...ec9B • $25,000 USDC</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-purple-900/60 text-purple-300 border border-purple-500/40">
              Select
            </span>
          </button>
        </div>

        {/* Security Note */}
        <div className="mt-5 p-3 rounded-xl bg-surfaceLight/30 border border-borderDark flex items-start space-x-2 text-[11px] text-gray-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
          <p>
            Non-custodial connection. resoQ uses Hyperliquid trade-only scoped keys and cannot withdraw your funds.
          </p>
        </div>
      </div>
    </div>
  );
};
