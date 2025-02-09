import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './entities/message.model';
import { ChatGateway } from './chat.gateway';
import {ChatController} from "./controllers/chat.controller";
import {ChatService} from "./services/chat.service";

@Module({
    imports: [SequelizeModule.forFeature([Message])],
    providers: [ChatGateway, ChatService],
    controllers: [ChatController],
    exports: [ChatGateway, ChatService],
})
export class ChatModule {}
