export interface PositionPair {
  id: string;
  asset: string;
  spotAmount: number;
  spotValueUsd: number;
  perpSize: number;
  perpValueUsd: number;
  entryPrice: number;
  currentPrice: number;
  currentFundingRate: number;
  annualizedApy: number;
  netDelta: number;
  unrealizedPnl: number;
  cumulativeFundingEarned: number;
  marginHealth: number;
  status: 'ACTIVE' | 'REBALANCING' | 'CLOSING' | 'UNWOUND';
  openedAt: string;
}

export interface AgentTelemetry {
  tvl: number;
  netApy: number;
  netDelta: number;
  totalFundingEarned: number;
  marginRatio: number;
  activePairsCount: number;
  riskScore: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'AUTONOMOUS_ACTIVE' | 'REBALANCING' | 'PAUSED' | 'DEFENSIVE_MODE';
  lastHeartbeat: string;
}

export interface AgentLog {
  id: string;
  timestamp: string;
  level: 'INFO' | 'SUCCESS' | 'WARN' | 'EXECUTE' | 'ALERT';
  category: 'DISCOVERY' | 'HEDGE_EXECUTION' | 'REBALANCE' | 'RISK_CHECK' | 'YIELD_HARVEST';
  message: string;
  metadata?: Record<string, any>;
}

export interface OpportunityScore {
  coin: string;
  price: number;
  fundingRateHourly: number;
  annualizedApy: number;
  openInterestUsd: number;
  volume24hUsd: number;
  liquidityScore: number;
  stabilityScore: number;
  compositeScore: number;
  basisSpreadPct: number;
  recommendedAllocationPct: number;
}
