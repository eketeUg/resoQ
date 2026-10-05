import { Module } from '@nestjs/common';
import { ScannerService } from './scanner.service';
import { HyperliquidModule } from '../hyperliquid/hyperliquid.module';

@Module({
  imports: [HyperliquidModule],
  providers: [ScannerService],
  exports: [ScannerService],
})
export class ScannerModule {}
