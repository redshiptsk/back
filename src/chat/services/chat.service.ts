import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Message} from "../entities/message.model";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message)
        private readonly messageModel: typeof Message
    ) {}

    async saveMessage(data: { senderId: number; text: string; imageUrl?: string; roomId: string }): Promise<Message> {
        return this.messageModel.create(data);
    }

    async getMessages(roomId: string): Promise<Message[]> {
        return this.messageModel.findAll({where: {roomId}});
    }

    async getRooms(userId: number) {
        const messages = await this.messageModel.findAll({where: {senderId: userId}});
        const rooms = messages.map((message) => message.roomId);
        const uniqueRooms = [...new Set(rooms)];
        return uniqueRooms
    }
}
