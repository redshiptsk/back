import {Controller, Post, Body, Get, Delete, Query} from '@nestjs/common';
import {FavoriteService} from "../services/favorite.service";
import {FavoriteItemDto} from "../dto/favorite-item.dto";
import {ApiTags, ApiOperation, ApiResponse, ApiQuery} from '@nestjs/swagger';

@ApiTags('favorites')
@Controller('favorites')
export class FavoriteController {
    constructor(private readonly favoriteService: FavoriteService) {
    }

    @Post('add')
    @ApiOperation({summary: 'Добавить товар в избранное'})
    async addToFavorites(
        @Query('userId') userId: number,
        @Body() favoriteItemDto: FavoriteItemDto
    ) {
        await this.favoriteService.addToFavorites(userId, favoriteItemDto);
        return {message: 'Item added to favorites'};
    }

    @Get()
    @ApiOperation({summary: 'Получить все избранные товары для пользователя'})
    @ApiQuery({name: 'userId', type: Number, required: true, description: 'ID пользователя'})
    async getFavorites(@Query('userId') userId: number) {
        return this.favoriteService.getFavorites(userId);
    }

    @Delete('remove')
    @ApiOperation({summary: 'Удалить товар из избранного'})
    @ApiQuery({name: 'userId', type: Number, required: true, description: 'ID пользователя'})
    @ApiQuery({name: 'productId', type: Number, required: true, description: 'ID товара'})
    async removeFromFavorites(
        @Query('userId') userId: number,
        @Query('productId') productId: number
    ) {
        await this.favoriteService.removeFromFavorites(userId, productId);
        return {message: 'Item removed from favorites'};
    }
}
