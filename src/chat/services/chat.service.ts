import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Message} from "../entities/message.model";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message)
        private readonly messageModel: typeof Message
    ) {}

    async saveMessage(data: { sender: string; text: string; imageUrl?: string; roomId: string }): Promise<Message> {
        return this.messageModel.create(data);
    }

    async getMessages(roomId: string): Promise<Message[]> {
        return this.messageModel.findAll({where: {roomId}});
    }
}
