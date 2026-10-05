"use client";

import { useEffect, useState, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { AgentTelemetry, AgentLog, OpportunityScore, PositionPair } from "../lib/types";

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8000";

export function useAgentStream() {
  const [isConnected, setIsConnected] = useState(false);
  const [telemetry, setTelemetry] = useState<AgentTelemetry>({
    tvl: 101420.50,
    netApy: 31.42,
    netDelta: 0.0000,
    totalFundingEarned: 1420.50,
    marginRatio: 18.4,
    activePairsCount: 3,
    riskScore: "LOW",
    status: "AUTONOMOUS_ACTIVE",
    lastHeartbeat: new Date().toISOString(),
  });

  const [logs, setLogs] = useState<AgentLog[]>([
    {
      id: "init-1",
      timestamp: new Date().toLocaleTimeString(),
      level: "SUCCESS",
      category: "DISCOVERY",
      message: "resoQ Agent initialized. Connected to Hyperliquid L1 orderbook stream & consensus.",
    },
    {
      id: "init-2",
      timestamp: new Date().toLocaleTimeString(),
      level: "INFO",
      category: "HEDGE_EXECUTION",
      message: "Delta-Neutral engine active: 3 active basis pairs. Zero directional exposure (Δ = 0.000).",
    },
  ]);

  const [opportunities, setOpportunities] = useState<OpportunityScore[]>([]);
  const [positions, setPositions] = useState<PositionPair[]>([]);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(WS_URL, {
      transports: ["websocket", "polling"],
      reconnectionAttempts: 10,
      reconnectionDelay: 2000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("agent:telemetry", (data: AgentTelemetry) => {
      setTelemetry(data);
    });

    socket.on("agent:log", (newLog: AgentLog) => {
      setLogs((prev) => [newLog, ...prev.slice(0, 99)]);
    });

    socket.on("market:opportunities", (data: OpportunityScore[]) => {
      setOpportunities(data);
    });

    socket.on("agent:positions", (data: PositionPair[]) => {
      setPositions(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const deposit = async (amount: number) => {
    try {
      await fetch(`${WS_URL}/agent/deposit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });
    } catch (e) {
      console.error("Deposit failed", e);
    }
  };

  const setRiskTolerance = async (risk: "CONSERVATIVE" | "BALANCED" | "AGGRESSIVE") => {
    try {
      await fetch(`${WS_URL}/agent/risk`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ risk }),
      });
    } catch (e) {
      console.error("Risk update failed", e);
    }
  };

  const emergencyUnwind = async () => {
    try {
      await fetch(`${WS_URL}/agent/unwind`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
    } catch (e) {
      console.error("Unwind failed", e);
    }
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
