import { Module } from '@nestjs/common';
import { RiskGuardService } from './risk-guard.service';

@Module({
  providers: [RiskGuardService],
  exports: [RiskGuardService],
})
export class RiskGuardModule {}
