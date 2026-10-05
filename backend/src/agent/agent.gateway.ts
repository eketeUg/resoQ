import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { AgentTelemetry, AgentLog, PositionPair } from '../hyperliquid/hyperliquid.types';
import { OpportunityScore } from '../scanner/scanner.service';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class AgentGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(AgentGateway.name);

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  broadcastTelemetry(telemetry: AgentTelemetry) {
    this.server?.emit('agent:telemetry', telemetry);
  }

  broadcastLog(log: AgentLog) {
    this.server?.emit('agent:log', log);
  }

  broadcastOpportunities(opportunities: OpportunityScore[]) {
    this.server?.emit('market:opportunities', opportunities);
  }

  broadcastPositions(positions: PositionPair[]) {
    this.server?.emit('agent:positions', positions);
  }

  @SubscribeMessage('client:ping')
  handlePing(client: Socket): string {
    return 'pong';
  }
}
