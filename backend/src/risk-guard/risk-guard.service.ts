import { Injectable, Logger } from '@nestjs/common';
import { PositionPair } from '../hyperliquid/hyperliquid.types';

export interface RiskEvaluation {
  isSafe: boolean;
  alertLevel: 'HEALTHY' | 'CAUTION' | 'CRITICAL';
  triggers: string[];
  recommendedAction: 'HOLD' | 'REBALANCE' | 'DEFENSIVE_UNWIND';
}

@Injectable()
export class RiskGuardService {
  private readonly logger = new Logger(RiskGuardService.name);

  evaluatePositionRisk(position: PositionPair, currentFundingRate: number, currentPrice: number): RiskEvaluation {
    const triggers: string[] = [];
    let isSafe = true;
    let alertLevel: 'HEALTHY' | 'CAUTION' | 'CRITICAL' = 'HEALTHY';
    let recommendedAction: 'HOLD' | 'REBALANCE' | 'DEFENSIVE_UNWIND' = 'HOLD';

    if (currentFundingRate < 0) {
      isSafe = false;
      alertLevel = 'CRITICAL';
      triggers.push(`Negative funding detected (${(currentFundingRate * 100 * 24 * 365).toFixed(1)}% APY). Basis trade paying fees.`);
      recommendedAction = 'DEFENSIVE_UNWIND';
    } else if (currentFundingRate < 0.00005) {
      alertLevel = 'CAUTION';
      triggers.push(`Low funding yield rate (${(currentFundingRate * 100 * 24 * 365).toFixed(1)}% APY). Consider capital rotation.`);
    }

    if (position.marginHealth < 50) {
      isSafe = false;
      alertLevel = 'CRITICAL';
      triggers.push(`Margin health degraded to ${position.marginHealth}%. Liquidation risk elevated.`);
      recommendedAction = 'DEFENSIVE_UNWIND';
    } else if (position.marginHealth < 75) {
      if (alertLevel !== 'CRITICAL') alertLevel = 'CAUTION';
      triggers.push(`Margin health at ${position.marginHealth}%. Approaching caution threshold.`);
      if (recommendedAction === 'HOLD') recommendedAction = 'REBALANCE';
    }

    const priceMovePct = Math.abs((currentPrice - position.entryPrice) / (position.entryPrice || 1)) * 100;
    if (priceMovePct > 40) {
      triggers.push(`Asset price moved ${priceMovePct.toFixed(1)}% since entry. Verify delta neutrality.`);
      if (recommendedAction === 'HOLD') recommendedAction = 'REBALANCE';
    }

    return {
      isSafe,
      alertLevel,
      triggers,
      recommendedAction,
    };
  }
}
