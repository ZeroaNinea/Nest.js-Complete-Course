import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  // WsResponse,
} from '@nestjs/websockets';
import { Observable, of } from 'rxjs';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class EventsGateway implements OnModuleInit {
  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', (socket) => {
      console.log('Client connected', socket.id);
      console.log(socket.connected);
    });
  }

  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: { msg: string },
    /* client: any, payload: any */
  ): Observable<{
    event: string;
    data: { msg: string };
  }> {
    return of({
      event: 'message',
      data: data,
    });
  }
}
