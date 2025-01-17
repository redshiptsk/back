import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/sequelize';
import { Message } from './entities/message.model';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(
        @InjectModel(Message)
        private readonly messageModel: typeof Message,
    ) {}

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    async handleMessage(@MessageBody() message: { sender: string; text: string }, client: Socket) {
        console.log('Received message:', message);
        await this.messageModel.create(message);
        client.broadcast.emit("message", message);
    }

    @SubscribeMessage('getMessages')
    async handleGetMessages(client: Socket) {
        const messages = await this.messageModel.findAll();
        const formattedMessages = messages.map(msg => ({
            sender: msg.sender,
            text: msg.text
        }));
        console.log('Sending messages:', formattedMessages);
        client.emit('messages', formattedMessages);
    }
}
