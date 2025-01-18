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
import * as fs from 'fs';
import * as path from 'path';

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

    @SubscribeMessage('sendImage')
    async handleImage(@MessageBody() message: { sender: string; image: string }, client: Socket) {
        const imageBuffer = Buffer.from(message.image, 'base64');
        const filename = `${Date.now()}.png`;
        const filePath = path.join(__dirname, '..', 'uploads', filename);

        fs.writeFileSync(filePath, imageBuffer);

        const newMessage = await this.messageModel.create({
            sender: message.sender,
            text: 'Image sent',
            imageUrl: `/uploads/${filename}`,
        });

        client.broadcast.emit('message', {
            sender: message.sender,
            text: 'Image sent',
            imageUrl: `/uploads/${filename}`,
        });
    }
}
