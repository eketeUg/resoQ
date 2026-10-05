import { Injectable, Logger } from '@nestjs/common';
import { PositionPair } from '../hyperliquid/hyperliquid.types';
import { OpportunityScore } from '../scanner/scanner.service';

export interface HedgeCalculation {
  asset: string;
  allocatedCapitalUsd: number;
  spotAllocationUsd: number;
  spotTokens: number;
  perpShortSizeTokens: number;
  perpNotionalUsd: number;
  initialNetDelta: number;
  estimatedDailyFundingUsd: number;
  estimatedAnnualYieldUsd: number;
  liquidationPricePerp: number;
  marginBufferPct: number;
}

@Injectable()
export class DeltaEngineService {
  private readonly logger = new Logger(DeltaEngineService.name);

  calculateHedge(
    opportunity: OpportunityScore,
    allocatedCapitalUsd: number,
    leverageMultiplier: number = 1.0,
  ): HedgeCalculation {
    const spotAllocationUsd = allocatedCapitalUsd * 0.5;
    const perpMarginUsd = allocatedCapitalUsd * 0.5;
    
    const spotTokens = spotAllocationUsd / opportunity.price;
    const perpShortSizeTokens = spotTokens;
    const perpNotionalUsd = perpShortSizeTokens * opportunity.price;

    const initialNetDelta = parseFloat(
      ((spotAllocationUsd - perpNotionalUsd) / allocatedCapitalUsd).toFixed(4),
    );

    const estimatedDailyFundingUsd = parseFloat(
      (perpNotionalUsd * opportunity.fundingRateHourly * 24).toFixed(2),
    );

    const estimatedAnnualYieldUsd = parseFloat(
      (perpNotionalUsd * (opportunity.annualizedApy / 100)).toFixed(2),
    );

    const liquidationPricePerp = opportunity.price * (1 + 1 / leverageMultiplier);
    const marginBufferPct = 100;

    return {
      asset: opportunity.coin,
      allocatedCapitalUsd,
      spotAllocationUsd,
      spotTokens,
      perpShortSizeTokens,
      perpNotionalUsd,
      initialNetDelta,
      estimatedDailyFundingUsd,
      estimatedAnnualYieldUsd,
      liquidationPricePerp,
      marginBufferPct,
    };
  }

  evaluateDeltaDrift(position: PositionPair, currentPrice: number): {
    currentDelta: number;
    driftPct: number;
    needsRebalance: boolean;
    rebalanceAction?: string;
  } {
    const currentSpotVal = position.spotAmount * currentPrice;
    const currentPerpVal = position.perpSize * currentPrice;
    const totalVal = currentSpotVal + currentPerpVal;

    const currentDelta = totalVal > 0 ? (currentSpotVal - currentPerpVal) / totalVal : 0;
    const driftPct = Math.abs(currentDelta) * 100;

    const needsRebalance = driftPct > 1.5;
    let rebalanceAction: string | undefined;

    if (needsRebalance) {
      if (currentDelta > 0) {
        rebalanceAction = `SELL ${Math.abs(position.spotAmount - position.perpSize).toFixed(4)} ${position.asset} spot or increase perp short to neutralize long bias.`;
      } else {
        rebalanceAction = `BUY spot or reduce perp short by ${Math.abs(position.perpSize - position.spotAmount).toFixed(4)} ${position.asset} to neutralize short bias.`;
      }
    }

    return {
      currentDelta: parseFloat(currentDelta.toFixed(4)),
      driftPct: parseFloat(driftPct.toFixed(2)),
      needsRebalance,
      rebalanceAction,
    };
  }
}
