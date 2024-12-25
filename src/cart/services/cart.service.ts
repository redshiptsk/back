import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItemDto } from '../dto/cart-item.dto';
import { Product } from '../../products/products.model';
import {CartItem} from "../entities/cart-item.model";

@Injectable()
export class CartService {
    private readonly logger = new Logger(CartService.name);

    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        @InjectModel(CartItem)
        private cartItemModel: typeof CartItem,
    ) {}

    async addToCart(cartItemDto: CartItemDto) {
        const { productId, quantity } = cartItemDto;
        this.logger.log(`Adding product with ID ${productId} to cart`);
        const product = await this.productModel.findByPk(productId);

        if (!product) {
            this.logger.error(`Product with ID ${productId} not found`);
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        let cartItem = await this.cartItemModel.findOne({ where: { productId } });
        if (cartItem) {
            cartItem.quantity += quantity;
            await cartItem.save();
        } else {
            cartItem = await this.cartItemModel.create({ productId, quantity });
        }
        this.logger.log(`Product with ID ${productId} added to cart`);
    }

    async getCart() {
        this.logger.log('Getting cart');
        return this.cartItemModel.findAll({ include: [Product] });
    }

    async clearCart() {
        this.logger.log('Clearing cart');
        await this.cartItemModel.destroy({ where: {} });
    }
}