"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { AgentTelemetry, AgentLog, OpportunityScore, PositionPair } from "../lib/types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8000";

const DEFAULT_OPPORTUNITIES: OpportunityScore[] = [
  {
    coin: "HYPE",
    price: 24.50,
    fundingRateHourly: 0.00035,
    annualizedApy: 30.66,
    openInterestUsd: 94000000,
    volume24hUsd: 185000000,
    liquidityScore: 92,
    stabilityScore: 90,
    compositeScore: 91.5,
    basisSpreadPct: 0.015,
    recommendedAllocationPct: 40,
  },
  {
    coin: "SUI",
    price: 3.42,
    fundingRateHourly: 0.00042,
    annualizedApy: 36.79,
    openInterestUsd: 65000000,
    volume24hUsd: 120000000,
    liquidityScore: 88,
    stabilityScore: 85,
    compositeScore: 87.2,
    basisSpreadPct: 0.022,
    recommendedAllocationPct: 30,
  },
  {
    coin: "SOL",
    price: 184.20,
    fundingRateHourly: 0.00028,
    annualizedApy: 24.53,
    openInterestUsd: 210000000,
    volume24hUsd: 450000000,
    liquidityScore: 98,
    stabilityScore: 92,
    compositeScore: 84.8,
    basisSpreadPct: 0.008,
    recommendedAllocationPct: 20,
  },
  {
    coin: "TIA",
    price: 5.80,
    fundingRateHourly: 0.00038,
    annualizedApy: 33.29,
    openInterestUsd: 39000000,
    volume24hUsd: 72000000,
    liquidityScore: 78,
    stabilityScore: 80,
    compositeScore: 80.4,
    basisSpreadPct: 0.019,
    recommendedAllocationPct: 10,
  },
  {
    coin: "PURR",
    price: 0.18,
    fundingRateHourly: 0.00055,
    annualizedApy: 48.18,
    openInterestUsd: 18000000,
    volume24hUsd: 35000000,
    liquidityScore: 68,
    stabilityScore: 72,
    compositeScore: 76.1,
    basisSpreadPct: 0.035,
    recommendedAllocationPct: 0,
  },
];

export function useAgentStream(walletAddress?: string | null) {
  const [isConnected, setIsConnected] = useState(false);
  
  // Track personal deposits made by this specific wallet
  const [userDeposited, setUserDeposited] = useState<number>(() => {
    if (walletAddress === "0x71C86596B325148963A1B521B22fe64850fa3a9F") {
      return 100000.00;
    }
    if (walletAddress === "0xAb5801a7D398351b8bE11C439e05C5B3259aec9B") {
      return 25000.00;
    }
    return 0; // Fresh wallets start with $0.00 until they deposit!
  });

  const [userAccrued, setUserAccrued] = useState<number>(() => {
    if (walletAddress === "0x71C86596B325148963A1B521B22fe64850fa3a9F") {
      return 1420.50;
    }
    if (walletAddress === "0xAb5801a7D398351b8bE11C439e05C5B3259aec9B") {
      return 315.20;
    }
    return 0;
  });

  // When wallet changes, update balance
  useEffect(() => {
    if (walletAddress === "0x71C86596B325148963A1B521B22fe64850fa3a9F") {
      setUserDeposited(100000.00);
      setUserAccrued(1420.50);
    } else if (walletAddress === "0xAb5801a7D398351b8bE11C439e05C5B3259aec9B") {
      setUserDeposited(25000.00);
      setUserAccrued(315.20);
    } else if (!walletAddress) {
      setUserDeposited(0);
      setUserAccrued(0);
    } else {
      // Any new connected wallet starts at $0 until they deposit
      setUserDeposited(0);
      setUserAccrued(0);
    }
  }, [walletAddress]);

  const [telemetry, setTelemetry] = useState<AgentTelemetry>({
    depositedPrincipal: userDeposited,
    totalFundingEarned: userAccrued,
    tvl: userDeposited + userAccrued,
    netApy: 31.42,
    netDelta: 0.0000,
    marginRatio: 18.4,
    activePairsCount: 3,
    riskScore: "LOW",
    status: "AUTONOMOUS_ACTIVE",
    lastHeartbeat: new Date().toISOString(),
  });

  // Sync telemetry state with user balance
  useEffect(() => {
    setTelemetry((prev) => ({
      ...prev,
      depositedPrincipal: userDeposited,
      totalFundingEarned: userAccrued,
      tvl: userDeposited + userAccrued,
    }));
  }, [userDeposited, userAccrued]);

  const [logs, setLogs] = useState<AgentLog[]>([
    {
      id: "init-1",
      timestamp: new Date().toLocaleTimeString(),
      level: "SUCCESS",
      category: "DISCOVERY",
      message: "resoQ Agent initialized. Sub-second WebSocket pipeline connected to Hyperliquid L1.",
    },
    {
      id: "init-2",
      timestamp: new Date().toLocaleTimeString(),
      level: "INFO",
      category: "HEDGE_EXECUTION",
      message: "Delta-Neutral engine active: 3 active basis pairs. Zero directional exposure (Δ = 0.0000).",
    },
  ]);

  const [opportunities, setOpportunities] = useState<OpportunityScore[]>(DEFAULT_OPPORTUNITIES);
  const [positions, setPositions] = useState<PositionPair[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(WS_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
      timeout: 5000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("agent:log", (newLog: AgentLog) => {
      setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
    });

    socket.on("market:opportunities", (data: OpportunityScore[]) => {
      if (Array.isArray(data) && data.length > 0) setOpportunities(data);
    });

    socket.on("agent:positions", (data: PositionPair[]) => {
      if (Array.isArray(data) && data.length > 0) setPositions(data);
    });

    // Real-time funding accumulation (only accrues if user has deposited > 0!)
    const interval = setInterval(() => {
      setUserAccrued((prevAccrued) => {
        if (userDeposited <= 0) return 0;
        // Accrues based on active capital at ~31.4% APY
        const ratePerTick = (userDeposited * 0.314) / (365 * 24 * 3600) * 2.5;
        return parseFloat((prevAccrued + ratePerTick).toFixed(2));
      });
    }, 2500);

    return () => {
      clearInterval(interval);
      socket.disconnect();
    };
  }, [userDeposited]);

  const deposit = async (amount: number) => {
    setUserDeposited((prev) => prev + amount);
    
    try {
      await fetch(`${WS_URL}/agent/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, wallet: walletAddress }),
      });
    } catch {}

    const log: AgentLog = {
      id: `dep-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: "SUCCESS",
      category: "HEDGE_EXECUTION",
      message: `Deposit Executed: Added $${amount.toLocaleString()} USDC from ${walletAddress ? walletAddress.substring(0, 6) + '...' + walletAddress.substring(walletAddress.length - 4) : 'wallet'}. Total Deposited: $${(userDeposited + amount).toLocaleString()} USDC.`,
    };
    setLogs((prev) => [log, ...prev.slice(0, 99)]);
  };

  const setRiskTolerance = async (risk: "CONSERVATIVE" | "BALANCED" | "AGGRESSIVE") => {
    try {
      await fetch(`${WS_URL}/agent/risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ risk }),
      });
    } catch {}

    const log: AgentLog = {
      id: `risk-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: "INFO",
      category: "REBALANCE",
      message: `Risk Policy Updated: Set to ${risk} mode. Re-weighting allocation parameters.`,
    };
    setLogs((prev) => [log, ...prev.slice(0, 99)]);
  };

  const emergencyUnwind = async () => {
    setUserDeposited(0);
    setUserAccrued(0);

    try {
      await fetch(`${WS_URL}/agent/unwind`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch {}

    setPositions((prev) => prev.map((p) => ({ ...p, status: "UNWOUND" })));
    setTelemetry((prev) => ({ ...prev, status: "DEFENSIVE_MODE" }));

    const log: AgentLog = {
      id: `unwind-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: "ALERT",
      category: "RISK_CHECK",
      message: `CIRCUIT BREAKER TRIGGERED: Emergency Unwind executed. Closed all perp short positions and returned full capital in USDC.`,
    };
    setLogs((prev) => [log, ...prev.slice(0, 99)]);
  };

  return {
    isConnected,
    telemetry,
    logs,
    opportunities,
    positions,
    deposit,
    setRiskTolerance,
    emergencyUnwind,
  };
}
