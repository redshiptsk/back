import {Controller, Post, Body, Get, Delete, Query} from '@nestjs/common';
import {CartService} from "../services/cart.service";
import {CartItemDto} from "../dto/cart-item.dto";
import {ApiTags} from "@nestjs/swagger";

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {
    }

    @Post('add')
    async addToCart(@Query('userId') userId: number, @Body() cartItemDto: CartItemDto) {
        await this.cartService.addToCart(userId, cartItemDto);
        return {message: 'Item added to cart'};
    }

    @Get()
    async getCart(@Query('userId') userId: number) {
        return this.cartService.getCart(userId);
    }

    @Delete('clear')
    async clearCart(@Query('userId') userId: number) {
        await this.cartService.clearCart(userId);
        return {message: 'Cart cleared'};
    }
}
