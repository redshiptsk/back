import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Message } from './entities/message.model';
import { ChatGateway } from './chat.gateway';

@Module({
    imports: [SequelizeModule.forFeature([Message])],
    providers: [ChatGateway],
    exports: [ChatGateway],
})
export class ChatModule {}
