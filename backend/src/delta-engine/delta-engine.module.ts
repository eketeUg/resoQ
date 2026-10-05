import { Module } from '@nestjs/common';
import { DeltaEngineService } from './delta-engine.service';

@Module({
  providers: [DeltaEngineService],
  exports: [DeltaEngineService],
})
export class DeltaEngineModule {}
