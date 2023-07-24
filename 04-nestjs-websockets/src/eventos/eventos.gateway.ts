/* eslint-disable prettier/prettier */
import { SubscribeMessage, WebSocketGateway, OnGatewayInit, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Socket, Server } from 'socket.io';
import { EventosService } from './eventos.service';

@WebSocketGateway(
    11202, // Puerto por donde se está escuchando el servidor de websockets
    {
        cors: {
            origin: '*', // Habilitando la conexión desde cualquier IP
        }
    })

export class EventosGateway {
    constructor(private readonly _eventosService: EventosService) {

    }
}

@SubscribeMessage('hola') // Nombre del método para recibir eventos
devolverHola(
    @MessageBody()
      message: { mensaje: string },
    @ConnectedSocket()
      socket: Socket // import {Server, Socket} from 'socket.io'
) {
    console.log('message', message);
    socket.broadcast //
    // broadcast: Todos los clientes conectados
    // Y que estén escuchando el evento "escucharEventoHola"
    // les llegue el mensaje
      .emit(
        'escucharEventoHola', // Nombre del evento a enviar
        // A los clientes conectados
        { //Objeto a enviar
            mensaje: this._eventosService.saludar() + ' ' + message.mensaje
        });
        return { mensaje: 'ok' };
}