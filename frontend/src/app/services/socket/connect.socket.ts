import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('ws://localhost:3002');
  }

  getSocket(): Socket {
    return this.socket;
  }
}
