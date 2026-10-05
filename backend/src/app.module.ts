import { Module } from '@nestjs/common';
import { HyperliquidModule } from './hyperliquid/hyperliquid.module';
import { ScannerModule } from './scanner/scanner.module';
import { DeltaEngineModule } from './delta-engine/delta-engine.module';
import { RiskGuardModule } from './risk-guard/risk-guard.module';
import { AgentModule } from './agent/agent.module';

@Module({
  imports: [
    HyperliquidModule,
    ScannerModule,
    DeltaEngineModule,
    RiskGuardModule,
    AgentModule,
  ],
})
export class AppModule {}
