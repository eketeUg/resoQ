# resoQ — Autonomous Delta-Neutral Yield & Risk Agent on Hyperliquid

> **Crypto World's Fair Hackathon (Colosseum) Submission**  
> _Category:_ Autonomous AI Agents & DeFi Primitives on Hyperliquid L1

---

## 🌟 Overview

**resoQ** is an autonomous quantitative yield, basis-arbitrage, and risk-managed hedging agent built directly on **Hyperliquid L1**.

In high-throughput perpetual decentralized exchanges like Hyperliquid, annualized funding rates on popular assets frequently surge between **20% to 50%+ APY**. However, manual basis trading is capital-inefficient, error-prone, and vulnerable to funding inversions and basis drift.

**resoQ solves this autonomously:**

1. **Perpetual Opportunity Radar:** Scans live Hyperliquid orderbooks and funding rate streams, ranking markets by risk-adjusted APR, liquidity depth, and basis spread.
2. **Autonomous Delta Engine ($\Delta = 0.00$):** Automatically allocates 50% Spot Long + 50% 1x Perp Short, eliminating directional exposure while capturing pure hourly funding distributions.
3. **Adaptive Micro-Rebalancing:** Continuously calculates delta drift and executes micro-adjustments to keep net portfolio exposure neutral.
4. **Autonomous Risk Shield & Circuit Breaker:** Instantly unwinds positions if funding turns negative or margin utilization exceeds danger thresholds.
5. **Real-time AI Reasoning Terminal:** Streams transparent quantitative decision logs, risk checks, and execution telemetry to a sleek command center.

---

## 🏗️ System Architecture

```
                               ┌────────────────────────────────────────┐
                               │       Hyperliquid L1 Consensus         │
                               │  Perp Orderbooks & Hourly Funding Rate │
                               └──────────────────┬─────────────────────┘
                                                  │
                                                  ▼
                               ┌────────────────────────────────────────┐
                               │        resoQ NestJS Agent Core         │
                               │                                        │
                               │  ┌──────────────────────────────────┐  │
                               │  │   HyperliquidService (L1 API)    │  │
                               │  └──────────────────┬───────────────┘  │
                               │                     │                  │
                               │  ┌──────────────────▼───────────────┐  │
                               │  │   Opportunity Scanner & APY Rank │  │
                               │  └──────────────────┬───────────────┘  │
                               │                     │                  │
                               │  ┌──────────────────▼───────────────┐  │
                               │  │   DeltaEngine (Δ=0 Calculation)  │  │
                               │  └──────────────────┬───────────────┘  │
                               │                     │                  │
                               │  ┌──────────────────▼───────────────┐  │
                               │  │   RiskGuard (Inversion & Margin) │  │
                               │  └──────────────────┬───────────────┘  │
                               │                     │                  │
                               │  ┌──────────────────▼───────────────┐  │
                               │  │   AgentBrain & Reasoning Loop    │  │
                               │  └──────────────────┬───────────────┘  │
                               │                     │                  │
                               │  ┌──────────────────▼───────────────┐  │
                               │  │   AgentGateway (WebSockets / WS) │  │
                               │  └──────────────────┬───────────────┘  │
                               └─────────────────────┼──────────────────┘
                                                     │
                                                     ▼
                               ┌────────────────────────────────────────┐
                               │       resoQ Trader Command Center      │
                               │    Next.js + Tailwind + Live Stream    │
                               └────────────────────────────────────────┘
```

---

## 🚀 Tech Stack

- **Backend / Agent Core:** [NestJS](https://nestjs.com/) (TypeScript), WebSockets (`@nestjs/websockets`, `socket.io`), Axios, RxJS.
- **L1 Network:** [Hyperliquid](https://hyperliquid.xyz/) (Perpetuals, Spot & HyperEVM).
- **Frontend / Terminal:** [Next.js](https://nextjs.org/) (App Router), [Tailwind CSS](https://tailwindcss.com/), Lucide Icons, Framer Motion.
- **Quantitative Engine:** Pure TypeScript delta-neutrality formulas, dynamic Sharpe estimation, and volatility-adjusted margin buffers.

---

## ⚡ Quick Start (Run Locally)

### 1. Start the NestJS Backend Agent

```bash
cd backend
npm install
npm run start:dev
```

_Backend runs on `http://localhost:8000` with WebSocket gateway streaming live telemetry._

### 2. Start the Next.js Frontend Dashboard

```bash
cd frontend
npm install
npm run dev
```

_Open `http://localhost:3000` in your browser._

---

<!-- ## 🏆 Hackathon Tracks & Alignment
- **Hyperliquid Track:** Deep native integration with Hyperliquid perpetual orderbook mechanics, hourly funding rates, sub-account vaults, and basis trading.
- **Colosseum Accelerator Target:** Built from day 1 as a scalable, non-custodial asset management protocol capable of scaling to tens of millions in institutional and retail TVL. -->
