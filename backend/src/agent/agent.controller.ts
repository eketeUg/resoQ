import { Controller, Get, Post, Body } from '@nestjs/common';
import { AgentBrainService } from './agent-brain.service';
import { ScannerService } from '../scanner/scanner.service';

@Controller('agent')
export class AgentController {
  constructor(
    private readonly brain: AgentBrainService,
    private readonly scanner: ScannerService,
  ) {}

  @Get('status')
  getStatus() {
    return this.brain.getStatus();
  }

  @Get('opportunities')
  getOpportunities() {
    return this.scanner.scanAndRankOpportunities();
  }

  @Post('deposit')
  deposit(@Body('amount') amount: number) {
    return this.brain.depositFunds(amount || 5000);
  }

  @Post('risk')
  setRisk(@Body('risk') risk: 'CONSERVATIVE' | 'BALANCED' | 'AGGRESSIVE') {
    return this.brain.setRiskTolerance(risk || 'BALANCED');
  }

  @Post('unwind')
  unwind() {
    return this.brain.emergencyUnwind();
  }
}
