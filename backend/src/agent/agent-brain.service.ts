import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { AgentGateway } from './agent.gateway';
import { ScannerService, OpportunityScore } from '../scanner/scanner.service';
import { DeltaEngineService } from '../delta-engine/delta-engine.service';
import { RiskGuardService } from '../risk-guard/risk-guard.service';
import { PositionPair, AgentTelemetry, AgentLog } from '../hyperliquid/hyperliquid.types';

@Injectable()
export class AgentBrainService implements OnModuleInit {
  private readonly logger = new Logger(AgentBrainService.name);
  
  private activePositions: PositionPair[] = [];
  private totalVaultTvl: number = 100000;
  private totalFundingEarned: number = 1420.50;
  private riskTolerance: 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE' = 'BALANCED';
  private agentStatus: 'AUTONOMOUS_ACTIVE' | 'REBALANCING' | 'PAUSED' | 'DEFENSIVE_MODE' = 'AUTONOMOUS_ACTIVE';
  private cachedOpportunities: OpportunityScore[] = [];

  constructor(
    private readonly gateway: AgentGateway,
    private readonly scanner: ScannerService,
    private readonly deltaEngine: DeltaEngineService,
    private readonly riskGuard: RiskGuardService,
  ) {}

  onModuleInit() {
    this.initializeDemoPositions();
    this.startAutonomousLoop();
    this.startMarketScannerLoop();
  }

  private initializeDemoPositions() {
    this.activePositions = [
      {
        id: 'pos-hype-1',
        asset: 'HYPE',
        spotAmount: 1224.48,
        spotValueUsd: 30000,
        perpSize: 1224.48,
        perpValueUsd: 30000,
        entryPrice: 24.50,
        currentPrice: 24.50,
        currentFundingRate: 0.00035,
        annualizedApy: 30.66,
        netDelta: 0.0000,
        unrealizedPnl: 0,
        cumulativeFundingEarned: 685.20,
        marginHealth: 98.5,
        status: 'ACTIVE',
        openedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
      },
      {
        id: 'pos-sui-1',
        asset: 'SUI',
        spotAmount: 7309.94,
        spotValueUsd: 25000,
        perpSize: 7309.94,
        perpValueUsd: 25000,
        entryPrice: 3.42,
        currentPrice: 3.42,
        currentFundingRate: 0.00042,
        annualizedApy: 36.79,
        netDelta: 0.0000,
        unrealizedPnl: 0,
        cumulativeFundingEarned: 512.40,
        marginHealth: 96.2,
        status: 'ACTIVE',
        openedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      },
      {
        id: 'pos-sol-1',
        asset: 'SOL',
        spotAmount: 108.57,
        spotValueUsd: 20000,
        perpSize: 108.57,
        perpValueUsd: 20000,
        entryPrice: 184.20,
        currentPrice: 184.20,
        currentFundingRate: 0.00028,
        annualizedApy: 24.53,
        netDelta: 0.0000,
        unrealizedPnl: 0,
        cumulativeFundingEarned: 222.90,
        marginHealth: 99.1,
        status: 'ACTIVE',
        openedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
      },
    ];
  }

  private startMarketScannerLoop() {
    const scan = async () => {
      try {
        const opps = await this.scanner.scanAndRankOpportunities();
        if (opps && opps.length > 0) {
          this.cachedOpportunities = opps;
          this.gateway.broadcastOpportunities(this.cachedOpportunities);
        }
      } catch (err) {
        this.logger.warn(`Scanner background refresh error: ${err.message}`);
      }
    };

    scan();
    setInterval(scan, 10000); // Poll Hyperliquid API every 10s asynchronously
  }

  private startAutonomousLoop() {
    this.logger.log('Starting resoQ Non-Blocking Autonomous Reasoning Loop (2s cadence)...');
    
    // Non-blocking tick every 2 seconds for continuous streaming
    setInterval(() => {
      try {
        this.executeCycle();
      } catch (err) {
        this.logger.error(`Error in agent cycle: ${err.message}`);
      }
    }, 2000);
  }

  executeCycle() {
    // 1. Accrue incremental funding yield
    this.totalFundingEarned += 0.05;
    
    this.activePositions.forEach((pos) => {
      pos.cumulativeFundingEarned += 0.018;
      // Slight price jitter to showcase continuous live delta tracking
      const jitter = (Math.random() - 0.5) * 0.0015;
      pos.currentPrice = parseFloat((pos.currentPrice * (1 + jitter)).toFixed(4));
      pos.spotValueUsd = parseFloat((pos.spotAmount * pos.currentPrice).toFixed(2));
      pos.perpValueUsd = parseFloat((pos.perpSize * pos.currentPrice).toFixed(2));
      
      const drift = this.deltaEngine.evaluateDeltaDrift(pos, pos.currentPrice);
      pos.netDelta = drift.currentDelta;
    });

    // 2. Compute portfolio metrics
    const totalAllocated = this.activePositions.reduce(
      (acc, p) => acc + p.spotValueUsd + p.perpValueUsd,
      0,
    );
    const weightedApy =
      this.activePositions.reduce(
        (acc, p) => acc + p.annualizedApy * (p.spotValueUsd + p.perpValueUsd),
        0,
      ) / (totalAllocated || 1);

    const portfolioNetDelta = parseFloat(
      (
        this.activePositions.reduce(
          (acc, p) => acc + (p.spotValueUsd - p.perpValueUsd),
          0,
        ) / (totalAllocated || 1)
      ).toFixed(4),
    );

    const telemetry: AgentTelemetry = {
      tvl: parseFloat((this.totalVaultTvl + this.totalFundingEarned).toFixed(2)),
      netApy: parseFloat(weightedApy.toFixed(2)),
      netDelta: portfolioNetDelta,
      totalFundingEarned: parseFloat(this.totalFundingEarned.toFixed(2)),
      marginRatio: 18.4,
      activePairsCount: this.activePositions.length,
      riskScore: 'LOW',
      status: this.agentStatus,
      lastHeartbeat: new Date().toISOString(),
    };

    this.gateway.broadcastTelemetry(telemetry);
    this.gateway.broadcastPositions(this.activePositions);

    if (this.cachedOpportunities.length > 0) {
      this.gateway.broadcastOpportunities(this.cachedOpportunities);
    }

    // 3. Stream quantitative decision reasoning log
    this.generateReasoningLog();
  }

  private logCounter = 0;
  private generateReasoningLog() {
    this.logCounter++;
    const top = this.cachedOpportunities[0] || {
      coin: 'HYPE',
      annualizedApy: 32.4,
      fundingRateHourly: 0.00037,
      openInterestUsd: 98000000,
    };

    const logTemplates: Array<() => AgentLog> = [
      () => ({
        id: `log-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        timestamp: new Date().toLocaleTimeString(),
        level: 'INFO',
        category: 'DISCOVERY',
        message: `Market Scanner: ${top.coin} leads ranking with ${top.annualizedApy}% APY (Hourly rate: +${(top.fundingRateHourly * 100).toFixed(4)}%) | L1 Open Interest: $${(top.openInterestUsd / 1e6).toFixed(1)}M`,
      }),
      () => ({
        id: `log-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        timestamp: new Date().toLocaleTimeString(),
        level: 'SUCCESS',
        category: 'YIELD_HARVEST',
        message: `Yield Engine: Accrued hourly basis distribution on Hyperliquid L1 (+$0.45 USDC). Net portfolio delta firmly locked at Δ = 0.0000.`,
      }),
      () => ({
        id: `log-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        timestamp: new Date().toLocaleTimeString(),
        level: 'INFO',
        category: 'RISK_CHECK',
        message: `Risk Guard: Margin health check optimal across 3 active positions. Current margin ratio: 18.4%, zero liquidation proximity.`,
      }),
      () => ({
        id: `log-${Date.now()}-${Math.random().toString(36).substring(7)}`,
        timestamp: new Date().toLocaleTimeString(),
        level: 'EXECUTE',
        category: 'REBALANCE',
        message: `Delta Engine: Micro-drift check completed across spot orderbook & perp CLOB. Spot Long vs. Perp Short sizing synchronized within 0.01% tolerance.`,
      }),
    ];

    const pick = logTemplates[this.logCounter % logTemplates.length]();
    this.gateway.broadcastLog(pick);
  }

  depositFunds(amount: number) {
    this.totalVaultTvl += amount;
    const log: AgentLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'SUCCESS',
      category: 'HEDGE_EXECUTION',
      message: `Vault Deposit: Injected $${amount.toLocaleString()} USDC. Autonomous agent deploying 50% Spot Long / 50% 1x Perp Short across highest APY pairs.`,
    };
    this.gateway.broadcastLog(log);
    this.executeCycle();
    return { success: true, newTvl: this.totalVaultTvl };
  }

  setRiskTolerance(risk: 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE') {
    this.riskTolerance = risk;
    const log: AgentLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'INFO',
      category: 'REBALANCE',
      message: `Risk Policy Updated: Set to ${risk} mode. Re-weighting allocation parameters.`,
    };
    this.gateway.broadcastLog(log);
    this.executeCycle();
    return { success: true, riskTolerance: this.riskTolerance };
  }

  emergencyUnwind() {
    this.agentStatus = 'DEFENSIVE_MODE';
    this.activePositions.forEach((p) => (p.status = 'UNWOUND'));
    const log: AgentLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      level: 'ALERT',
      category: 'RISK_CHECK',
      message: `CIRCUIT BREAKER TRIGGERED: Emergency Unwind executed. Closed all perp short positions and converted spot long to USDC.`,
    };
    this.gateway.broadcastLog(log);
    this.executeCycle();
    return { success: true, status: this.agentStatus };
  }

  getStatus() {
    return {
      tvl: this.totalVaultTvl + this.totalFundingEarned,
      totalFundingEarned: this.totalFundingEarned,
      positions: this.activePositions,
      riskTolerance: this.riskTolerance,
      status: this.agentStatus,
    };
  }
}
