import { Injectable, Logger } from '@nestjs/common';
import { HyperliquidService } from '../hyperliquid/hyperliquid.service';
import { PerpMarketContext } from '../hyperliquid/hyperliquid.types';

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

@Injectable()
export class ScannerService {
  private readonly logger = new Logger(ScannerService.name);

  constructor(private readonly hlService: HyperliquidService) {}

  async scanAndRankOpportunities(): Promise<OpportunityScore[]> {
    const markets = await this.hlService.getMarketContexts();

    const validMarkets = markets.filter(
      (m) => m.fundingRate > 0.00005 && m.openInterest >= 1000000,
    );

    const scored = validMarkets.map((m) => {
      const oiScore = Math.min(50, (m.openInterest / 50000000) * 50);
      const volScore = Math.min(50, (m.dayNtlVlm / 100000000) * 50);
      const liquidityScore = Math.round(oiScore + volScore);

      const absChange = Math.abs(m.change24h);
      const stabilityScore = Math.max(20, Math.round(100 - absChange * 4));

      const apyFactor = Math.min(100, (m.annualizedApy / 50) * 100);
      const compositeScore = parseFloat(
        (apyFactor * 0.6 + liquidityScore * 0.25 + stabilityScore * 0.15).toFixed(2),
      );

      const basisSpreadPct = Math.abs((m.markPx - m.oraclePx) / m.oraclePx) * 100;

      return {
        coin: m.coin,
        price: m.oraclePx,
        fundingRateHourly: m.fundingRate,
        annualizedApy: parseFloat(m.annualizedApy.toFixed(2)),
        openInterestUsd: m.openInterest,
        volume24hUsd: m.dayNtlVlm,
        liquidityScore,
        stabilityScore,
        compositeScore,
        basisSpreadPct: parseFloat(basisSpreadPct.toFixed(3)),
        recommendedAllocationPct: 0,
      };
    });

    scored.sort((a, b) => b.compositeScore - a.compositeScore);

    const topN = scored.slice(0, 4);
    const totalTopScore = topN.reduce((acc, curr) => acc + curr.compositeScore, 0);

    topN.forEach((opp) => {
      opp.recommendedAllocationPct = Math.round((opp.compositeScore / (totalTopScore || 1)) * 100);
    });

    return scored;
  }
}
