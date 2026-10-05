import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { PerpMarketContext, PerpMeta } from './hyperliquid.types';

@Injectable()
export class HyperliquidService {
  private readonly logger = new Logger(HyperliquidService.name);
  
  // Testnet vs Mainnet toggle (defaults to testnet for safe hackathon development)
  private readonly network = process.env.HYPERLIQUID_NETWORK || 'testnet';
  private readonly apiUrl =
    this.network === 'mainnet'
      ? 'https://api.hyperliquid.xyz/info'
      : 'https://api.hyperliquid-testnet.xyz/info';

  getNetwork(): string {
    return this.network;
  }

  async getMarketContexts(): Promise<PerpMarketContext[]> {
    try {
      this.logger.log(`Fetching live market contexts from Hyperliquid ${this.network.toUpperCase()} (${this.apiUrl})...`);
      
      const response = await axios.post(
        this.apiUrl,
        { type: 'metaAndAssetCtxs' },
        { headers: { 'Content-Type': 'application/json' }, timeout: 5000 },
      );

      const [meta, assetCtxs] = response.data;
      const universe: PerpMeta[] = meta.universe;

      return universe.map((coinMeta, index) => {
        const ctx = assetCtxs[index];
        const fundingRate = parseFloat(ctx?.funding || '0');
        const oraclePx = parseFloat(ctx?.oraclePx || '1');
        const markPx = parseFloat(ctx?.markPx || oraclePx.toString());
        const openInterest = parseFloat(ctx?.openInterest || '0') * oraclePx;
        const dayNtlVlm = parseFloat(ctx?.dayNtlVlm || '0');
        const prevDayPx = parseFloat(ctx?.prevDayPx || oraclePx.toString());
        const change24h = prevDayPx > 0 ? ((oraclePx - prevDayPx) / prevDayPx) * 100 : 0;
        
        // Annualized APY = 1-hour rate * 24 hours * 365 days * 100%
        const annualizedApy = fundingRate * 24 * 365 * 100;

        return {
          coin: coinMeta.name,
          fundingRate,
          annualizedApy,
          openInterest,
          oraclePx,
          markPx,
          dayNtlVlm,
          prevDayPx,
          change24h,
        };
      });
    } catch (error) {
      this.logger.warn(
        `Failed to fetch live ${this.network} data from ${this.apiUrl}, generating resilient market snapshot: ${error.message}`,
      );
      return this.getFallbackMarkets();
    }
  }

  getFallbackMarkets(): PerpMarketContext[] {
    const assets = [
      { coin: 'HYPE', px: 24.5, funding: 0.00035, vol: 185000000, oi: 94000000 },
      { coin: 'SOL', px: 184.2, funding: 0.00028, vol: 450000000, oi: 210000000 },
      { coin: 'SUI', px: 3.42, funding: 0.00042, vol: 120000000, oi: 65000000 },
      { coin: 'PURR', px: 0.18, funding: 0.00055, vol: 35000000, oi: 18000000 },
      { coin: 'ETH', px: 2750.0, funding: 0.00018, vol: 620000000, oi: 340000000 },
      { coin: 'BTC', px: 68400.0, funding: 0.00015, vol: 890000000, oi: 520000000 },
      { coin: 'AVAX', px: 29.8, funding: 0.00022, vol: 85000000, oi: 42000000 },
      { coin: 'ARB', px: 0.65, funding: 0.00026, vol: 65000000, oi: 31000000 },
      { coin: 'TIA', px: 5.80, funding: 0.00038, vol: 72000000, oi: 39000000 },
      { coin: 'SEI', px: 0.44, funding: 0.00031, vol: 54000000, oi: 28000000 },
    ];

    return assets.map((a) => ({
      coin: a.coin,
      fundingRate: a.funding,
      annualizedApy: a.funding * 24 * 365 * 100,
      openInterest: a.oi,
      oraclePx: a.px,
      markPx: a.px,
      dayNtlVlm: a.vol,
      prevDayPx: a.px * 0.98,
      change24h: 2.04,
    }));
  }
}
