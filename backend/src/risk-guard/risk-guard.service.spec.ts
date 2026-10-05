import { Test, TestingModule } from '@nestjs/testing';
import { RiskGuardService } from './risk-guard.service';

describe('RiskGuardService', () => {
  let service: RiskGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RiskGuardService],
    }).compile();

    service = module.get<RiskGuardService>(RiskGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should trigger DEFENSIVE_UNWIND on negative funding rate', () => {
    const position = {
      id: 'pos-1',
      asset: 'HYPE',
      spotAmount: 100,
      spotValueUsd: 2500,
      perpSize: 100,
      perpValueUsd: 2500,
      entryPrice: 25.0,
      currentPrice: 25.0,
      currentFundingRate: -0.0002, // Inversion
      annualizedApy: -17.52,
      netDelta: 0.0,
      unrealizedPnl: 0,
      cumulativeFundingEarned: 5,
      marginHealth: 95,
      status: 'ACTIVE' as const,
      openedAt: new Date().toISOString(),
    };

    const evalResult = service.evaluatePositionRisk(position, -0.0002, 25.0);
    expect(evalResult.isSafe).toBe(false);
    expect(evalResult.alertLevel).toBe('CRITICAL');
    expect(evalResult.recommendedAction).toBe('DEFENSIVE_UNWIND');
  });

  it('should report HEALTHY when margin is high and funding is positive', () => {
    const position = {
      id: 'pos-2',
      asset: 'SOL',
      spotAmount: 50,
      spotValueUsd: 9000,
      perpSize: 50,
      perpValueUsd: 9000,
      entryPrice: 180.0,
      currentPrice: 180.0,
      currentFundingRate: 0.0003,
      annualizedApy: 26.28,
      netDelta: 0.0,
      unrealizedPnl: 0,
      cumulativeFundingEarned: 40,
      marginHealth: 98,
      status: 'ACTIVE' as const,
      openedAt: new Date().toISOString(),
    };

    const evalResult = service.evaluatePositionRisk(position, 0.0003, 180.0);
    expect(evalResult.isSafe).toBe(true);
    expect(evalResult.alertLevel).toBe('HEALTHY');
    expect(evalResult.recommendedAction).toBe('HOLD');
  });
});
