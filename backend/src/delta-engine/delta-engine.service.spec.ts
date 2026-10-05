import { Test, TestingModule } from '@nestjs/testing';
import { DeltaEngineService } from './delta-engine.service';
import { OpportunityScore } from '../scanner/scanner.service';

describe('DeltaEngineService', () => {
  let service: DeltaEngineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeltaEngineService],
    }).compile();

    service = module.get<DeltaEngineService>(DeltaEngineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should calculate 50/50 spot long vs perp short for delta neutrality', () => {
    const opportunity: OpportunityScore = {
      coin: 'HYPE',
      price: 25.0,
      fundingRateHourly: 0.0003,
      annualizedApy: 26.28,
      openInterestUsd: 50000000,
      volume24hUsd: 100000000,
      liquidityScore: 90,
      stabilityScore: 90,
      compositeScore: 85,
      basisSpreadPct: 0.02,
      recommendedAllocationPct: 40,
    };

    const hedge = service.calculateHedge(opportunity, 10000);

    expect(hedge.spotAllocationUsd).toBe(5000);
    expect(hedge.perpNotionalUsd).toBe(5000);
    expect(hedge.spotTokens).toBe(200);
    expect(hedge.perpShortSizeTokens).toBe(200);
    expect(hedge.initialNetDelta).toBe(0.0000);
    expect(hedge.estimatedDailyFundingUsd).toBe(36.00); // 5000 * 0.0003 * 24
  });

  it('should detect delta drift exceeding threshold when positions are asymmetric', () => {
    const position = {
      id: 'pos-test',
      asset: 'HYPE',
      spotAmount: 220, // Excess spot long
      spotValueUsd: 5500,
      perpSize: 200,
      perpValueUsd: 5000,
      entryPrice: 25.0,
      currentPrice: 25.0,
      currentFundingRate: 0.0003,
      annualizedApy: 26.28,
      netDelta: 0.0,
      unrealizedPnl: 0,
      cumulativeFundingEarned: 10,
      marginHealth: 98,
      status: 'ACTIVE' as const,
      openedAt: new Date().toISOString(),
    };

    const drift = service.evaluateDeltaDrift(position, 25.0);
    expect(drift.driftPct).toBeGreaterThan(1.5);
    expect(drift.needsRebalance).toBe(true);
    expect(drift.rebalanceAction).toBeDefined();
  });
});
