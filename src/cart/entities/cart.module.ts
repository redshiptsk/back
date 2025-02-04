import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {Product} from "../../products/products.model";
import {CartService} from "../services/cart.service";
import {CartController} from "../controllers/cart.controller";
import {CartItem} from "./cart-item.model";

@Module({
    imports: [SequelizeModule.forFeature([Product, CartItem])],
    providers: [CartService],
    controllers: [CartController],
    exports: [CartService],
})
export class CartModule {}
