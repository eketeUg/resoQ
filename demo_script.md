# resoQ — 2.5-Minute Pitch & Demo Video Script

**Title:** resoQ — Autonomous Delta-Neutral Yield & Risk Agent on Hyperliquid L1  
**Target Duration:** 2 minutes 30 seconds

---

### **[0:00 - 0:30] — The Hook & The Problem**
*(Visual: Screen showing Hyperliquid perp markets with high funding rates)*

> **Speaker:**
> "Welcome to the future of onchain wealth generation. In decentralized perpetual markets like Hyperliquid, funding rates on assets like HYPE, SUI, and SOL frequently surge between 20% to 50%+ APY.
> 
> But for everyday traders and fund managers, capturing this yield is exhausting. You have to manually calculate spot-perp ratios, constantly watch for funding rate inversions, and manually rebalance to avoid directional losses.
> 
> Meet **resoQ** — the autonomous delta-neutral yield and risk agent built specifically for Hyperliquid."

---

### **[0:30 - 1:30] — Live Product Demo & Agent Terminal**
*(Visual: Switching to live resoQ dashboard at localhost:3000)*

> **Speaker:**
> "Here on the **resoQ Command Center**, you can see the autonomous agent in action in real-time.
> 
> Look at the top metrics: our portfolio is generating a **+31.4% net annualized APY**, while maintaining a **Net Delta of exactly zero ($\Delta = 0.00$)**. This means users earn pure funding yield with **zero directional price risk**.
> 
> Here in the **Agent Terminal**, you can watch the agent's live quantitative reasoning stream. Every few seconds, the agent evaluates orderbook liquidity on Hyperliquid L1, verifies that margin health is above 97%, and performs micro-rebalances to eliminate basis drift.
> 
> Below, our **Opportunity Radar** scans and scores every perp on Hyperliquid, weighting funding APY, 24-hour volume, and market stability.
> 
> With **1-click deposit controls**, users can inject capital, adjust autonomous risk policy from Conservative to Aggressive, or trigger an emergency instant unwind circuit breaker."

---

### **[1:30 - 2:00] — Architecture & Tech Stack**
*(Visual: Display architecture diagram)*

> **Speaker:**
> "Under the hood, resoQ is built on a high-performance **NestJS modular backend** paired with **Next.js**. 
> 
> It streams live sub-second orderbook telemetry from Hyperliquid's consensus layer, processes delta calculations in real time, and broadcasts decisions via WebSockets to our responsive frontend."

---

### **[2:00 - 2:30] — Vision & Next Steps**
*(Visual: Team / Road Ahead slide)*

> **Speaker:**
> "resoQ transforms complex quantitative hedge fund strategies into a 1-click, autonomous onchain experience.
> 
> Moving into the Colosseum Accelerator in San Francisco, we are expanding resoQ into permissionless user vaults, multi-asset automated rotation, and cross-margin optimization on the HyperEVM.
> 
> Thank you, and welcome to **resoQ**!"
