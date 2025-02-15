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

    @SubscribeMessage("joinRoom")
    handleJoinRoom(client: Socket, roomId: string) {
        client.join(roomId);
        console.log(`Client ${client.id} joined room ${roomId}`);
    }

    @SubscribeMessage('message')
    async handleMessage(
        @MessageBody() message: { senderId: number; text: string; roomId: string; imageUrl?: string },
        client: Socket,
    ) {
        const savedMessage = await this.chatService.saveMessage(message);
        this.server.to(message.roomId).emit("message", savedMessage);
    }

    @SubscribeMessage("getMessages")
    async handleGetMessages(client: Socket, roomId: string) {
        const messages = await this.chatService.getMessages(roomId);
        client.emit("messages", messages);
    }

    @SubscribeMessage("getRooms")
    async handleGetRooms(client: Socket, userId: number) {
        const rooms = await this.chatService.getRooms(userId);
        this.server.emit("rooms", rooms);
    }

}
