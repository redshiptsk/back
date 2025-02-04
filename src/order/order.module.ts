import {Module} from '@nestjs/common';
import {SequelizeModule} from "@nestjs/sequelize";
import {Order, OrderItem, Payment} from "./entities";
import {OrderController} from "./order.controller";
import {OrderService} from "./order.service";
import {CartModule} from "../cart/entities/cart.module";
import {UsersModule} from "../users/users.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Order, OrderItem, Payment]),
        CartModule,
        UsersModule
    ],
    controllers: [OrderController],
    providers: [OrderService],
})
export class OrderModule {}
