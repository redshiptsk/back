import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import {Server, Socket} from 'socket.io';
import {ChatService} from "./services/chat.service";

@WebSocketGateway({cors: true})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    constructor(private readonly chatService: ChatService) {}

    handleConnection(client: Socket) {
        console.log(`Client connected: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Client disconnected: ${client.id}`);
    }

    @SubscribeMessage('message')
    async handleMessage(
        @MessageBody() message: { sender: string; text: string },
        client: Socket,
    ) {
        const savedMessage = await this.chatService.saveMessage(message);
        this.server.emit('message', savedMessage);
    }

    @SubscribeMessage('getMessages')
    async handleGetMessages(client: Socket) {
        const messages = await this.chatService.getAllMessages();
        client.emit('messages', messages);
    }
}
