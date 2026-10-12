export interface PerpMeta {
  name: string;
  szDecimals: number;
  maxLeverage: number;
  onlyIsolated?: boolean;
}

export interface PerpMarketContext {
  coin: string;
  fundingRate: number;
  annualizedApy: number;
  openInterest: number;
  oraclePx: number;
  markPx: number;
  dayNtlVlm: number;
  prevDayPx: number;
  change24h: number;
}

export interface SpotAssetContext {
  name: string;
  midPx: number;
  circulatingSupply?: number;
}

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
  depositedPrincipal: number;
  totalFundingEarned: number;
  tvl: number;
  netApy: number;
  netDelta: number;
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
