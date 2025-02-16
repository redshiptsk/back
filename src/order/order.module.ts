import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Order, OrderItem, Payment } from "./entities";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import { CartModule } from "../cart/entities/cart.module";
import { UsersModule } from "../users/users.module";
import { ChatModule } from "../chat/chat.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Order, OrderItem, Payment]),
    CartModule,
    UsersModule,
    ChatModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
