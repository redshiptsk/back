import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItemDto } from '../dto/cart-item.dto';
import { Product } from '../../products/products.model';
import {CartItem} from "../entities/cart-item.model";
import {Transaction} from "sequelize";

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);

    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        @InjectModel(CartItem)
        private cartItemModel: typeof CartItem,
    ) {}

    async addToCart(userId: number, cartItemDto: CartItemDto) {
        const { productId, quantity } = cartItemDto;
        const product = await this.productModel.findByPk(productId);

        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        let cartItem = await this.cartItemModel.findOne({ where: { productId, userId } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await this.cartItemModel.create({ productId, quantity, userId });
        }
    }

    async getCart(userId: number) {
        return this.cartItemModel.findAll({
            where: { userId },
            include: [Product]
        });
    }

    async clearCart(userId: number, transaction?: Transaction) {
        await this.cartItemModel.destroy({
            where: { userId },
            transaction,
        });
    }
}