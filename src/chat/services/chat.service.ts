import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import {Message} from "../entities/message.model";

@Injectable()
export class ChatService {
    constructor(
        @InjectModel(Message)
        private readonly messageModel: typeof Message,
    ) {}

    async saveMessage(data: { sender: string; text: string; imageUrl?: string }): Promise<Message> {
        return this.messageModel.create(data);
    }

    async getAllMessages(): Promise<Message[]> {
        return this.messageModel.findAll();
    }
}
