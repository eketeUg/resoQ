import { Module } from '@nestjs/common';
import { AgentGateway } from './agent.gateway';
import { AgentBrainService } from './agent-brain.service';
import { AgentController } from './agent.controller';
import { HyperliquidModule } from '../hyperliquid/hyperliquid.module';
import { ScannerModule } from '../scanner/scanner.module';
import { DeltaEngineModule } from '../delta-engine/delta-engine.module';
import { RiskGuardModule } from '../risk-guard/risk-guard.module';

@Module({
  imports: [
    HyperliquidModule,
    ScannerModule,
    DeltaEngineModule,
    RiskGuardModule,
  ],
  controllers: [AgentController],
  providers: [AgentGateway, AgentBrainService],
  exports: [AgentBrainService, AgentGateway],
})
export class AgentModule {}
