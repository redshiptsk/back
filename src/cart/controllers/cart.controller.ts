import { Controller, Post, Body, Get, Delete } from '@nestjs/common';
import {CartService} from "../services/cart.service";
import {CartItemDto} from "../dto/cart-item.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    async addToCart(@Body() cartItemDto: CartItemDto) {
        await this.cartService.addToCart(cartItemDto);
        return { message: 'Item added to cart' };
    }

    @Get()
    getCart() {
        return this.cartService.getCart();
    }

    @Delete('clear')
    clearCart() {
        this.cartService.clearCart();
        return { message: 'Cart cleared' };
    }
}
