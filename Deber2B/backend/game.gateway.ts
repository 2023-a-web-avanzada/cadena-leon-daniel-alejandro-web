/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayInit,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway(4001, { cors: { origins: '*:*' } })
export class GameGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {


  @WebSocketServer() server: Server;
  private players = new Map<string, any>();
  private rooms = new Map<number, Set<string>>();
  private playerToRoom = new Map<string, number>();
  private playerStartTimes = new Map<number, Date>();

  afterInit(server: Server) {
    console.info('Initialized!');
    [100, 101, 102].forEach(roomId => this.rooms.set(roomId, new Set()));
  }

  handleConnection(client: WebSocket): void {
    console.info('Connected new client!');
  }

  async handleDisconnect(client: WebSocket): Promise<void> {
    const disconnectingPlayer = this.findPlayerByClient(client);

    if (disconnectingPlayer) {

      this.handlePlayerRoomDisconnection(disconnectingPlayer);
      
      console.info(`playerDisconnected - Player disconnected: ${disconnectingPlayer.username}`);
    }
  }

  @SubscribeMessage('initializePlayer')
  async handleInitializePlayer(client: WebSocket, data: { username: string, password: string }): Promise<void> {

      const player = this.createPlayer(data.username, client);
      client.send(JSON.stringify({ event: 'handledData', player }));
      console.info(`initializePlayer - Player initialized: ${player.username}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: WebSocket, data: { roomId: number; x: number; y: number }): void {
    const player = this.findPlayerByClient(client);
    if (!player) {
      console.error('handleJoinRoom - Player not found.');
      return;
    }
    this.setPlayerPosition(player, data);
    this.broadcastToRoom(data.roomId, { event: 'newPlayer', player }, client);
    this.handleRoomChange(player, data.roomId);

    this.sendJoinRoomResponse(client, data.roomId);

    console.info('joinRoom - ' + player.username + ' joined room with ID: ' + data.roomId);
  }

  private sendJoinRoomResponse(client: WebSocket, roomId: number): void {
    const playersInRoom = Array.from(this.rooms.get(roomId) || [])
      .map(playerId => this.players.get(playerId))
      .filter(player => player)
      .map(player => {
        const { client, ...playerData } = player;
        return playerData;
      });
    client.send(JSON.stringify({
      event: 'handledJoinRoom',
      players: playersInRoom,
      roomId: roomId
    }));
  }


  @SubscribeMessage('playerMove')
  handlePlayerMove(client: WebSocket, data: { id: string; x: number; y: number }): void {
    const player = this.players.get(data.id);
    if (player) {
      this.setPlayerPosition(player, data);
      const roomId = this.playerToRoom.get(data.id);
      roomId && this.broadcastToRoom(roomId, { event: 'playerMoved', ...data });
    } else {
      console.error(`playerMove - Player with ID ${data.id} not found.`);
    }
  }

  @SubscribeMessage('playerTeleport')
  handlePlayerTeleport(client: WebSocket, data: { id: string; x: number; y: number }): void {
    const player = this.players.get(data.id);
    if (player) {
      this.setPlayerPosition(player, data);
      const roomId = this.playerToRoom.get(data.id);
      roomId && this.broadcastToRoom(roomId, { event: 'playerTeleported', ...data });
      console.info(`playerTeleport - Player ${player.username} teleported to ${data.x}, ${data.y}`);
    } else {
      console.error(`playerTeleport - Player with ID ${data.id} not found.`);
    }
  }

  @SubscribeMessage('playerMessage')
  handlePlayerMessage(client: WebSocket, data: { id: string; message: string }): void {
    const player = this.players.get(data.id);
    if (player) {
      const roomId = this.playerToRoom.get(data.id);
      roomId && this.broadcastToRoom(roomId, { event: 'playerMessaged', ...data });

      console.info(`playerMessage - ${player.username} sent message: ${data.message} in room ID: ${roomId}`);
    } else {
      console.warn(`playerMessage - Player with ID ${data.id} not found.`);
    }
  }

  @SubscribeMessage('playerAction')
  handlePlayerAction(client: WebSocket, data: { id: string; actionId: number }): void {
    const player = this.players.get(data.id);
    if (player) {
      player.animation = data.actionId;
      this.handleRoomEvent(data.id, 'playerActioned', data);
    }

  }

  private findPlayerByClient(client: WebSocket): any {
    return Array.from(this.players.values()).find(p => p.client === client);
  }

  private handlePlayerRoomDisconnection(player: any): void {
    const roomId = this.playerToRoom.get(player.id);
    
    if (roomId) {
      this.rooms.get(roomId)?.delete(player.id);
      this.broadcastToRoom(roomId, { event: 'playerDisconnected', id: player.id });
    }

    this.playerStartTimes.delete(player.id);
    this.players.delete(player.id);
  }

  private createPlayer(userDoc: any, client: WebSocket): any {
    const user = userDoc.toObject();
    user.client = client;
    delete user.password;
    delete user._id;

    this.players.set(user.id, user);
    this.playerStartTimes.set(user.id, new Date());

    return user;
}
  private setPlayerPosition(player: any, data: { x: number; y: number }): void {
    player.x = data.x;
    player.y = data.y;
  }

  private handleRoomChange(player: any, roomId: number): void {
    const prevRoomId = this.playerToRoom.get(player.id);
    if (prevRoomId && prevRoomId !== roomId) {
      this.rooms.get(prevRoomId)?.delete(player.id);
      this.broadcastToRoom(prevRoomId, { event: 'playerDisconnected', id: player.id });
      console.info(`${player.username} left room ${prevRoomId}`);
    }
    this.rooms.get(roomId)?.add(player.id);
    this.playerToRoom.set(player.id, roomId);
  }

  private handleRoomEvent(playerId: string, eventName: string, data: any): void {
    const player = this.players.get(playerId);
    if (player) {
      const roomId = this.playerToRoom.get(playerId);
      roomId && this.broadcastToRoom(roomId, { event: eventName, ...data });
    }
  }

  private broadcastToRoom(roomId: number, message: any, excludeClient?: WebSocket): void {
    const roomPlayers = this.rooms.get(roomId);
    this.server.clients.forEach(client => {
      const playerData = this.findPlayerByClient(client);
      if (playerData && roomPlayers?.has(playerData.id) && client !== excludeClient) {
        client.send(JSON.stringify(message));
      }
    });
  }

  private getRoomIdForClient(client: WebSocket): number | undefined {
    const player = this.findPlayerByClient(client);
    return player ? this.playerToRoom.get(player.id) : undefined;
  }
}
