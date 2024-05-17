import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3002, {})
export class CommentGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log('new user connection', client.id);
  }

  handleDisconnect(client: Socket) {
    console.log('user disconnection', client.id);
  }
  @SubscribeMessage('newComment')
  handleNewComment(client: Socket, comment: any) {
    console.log('New comment received:', comment);
    client.emit('comment', comment); 
    this.server.emit('broadcast', 'New comment added');
  }

}
