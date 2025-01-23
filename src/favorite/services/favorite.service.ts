import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {FavoriteItem} from "../entities/favorite-item.model";
import {Product} from "../../products/products.model";
import {FavoriteItemDto} from "../dto/favorite-item.dto";

@Injectable()
export class FavoriteService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        @InjectModel(FavoriteItem)
        private favoriteItemModel: typeof FavoriteItem,
    ) {}

    async addToFavorites(userId: number, favoriteItemDto: FavoriteItemDto) {
        const { productId } = favoriteItemDto;
        const product = await this.productModel.findByPk(productId);
        if (!product) {
            throw new NotFoundException(`Product with ID ${productId} not found`);
        }

        const existingFavorite = await this.favoriteItemModel.findOne({ where: { productId, userId } });
        if (!existingFavorite) {
            await this.favoriteItemModel.create({ productId, userId });
        }
    }

    async getFavorites(userId: number) {
        try {
            const favorites = await this.favoriteItemModel.findAll({
                where: { userId },
                include: [Product],
            });
            return favorites;
        } catch (error) {
            console.error(error);
            throw new Error('Error retrieving favorites');
        }
    }

    async removeFromFavorites(userId: number, productId: number) {
        const favoriteItem = await this.favoriteItemModel.findOne({ where: { productId, userId } });
        if (!favoriteItem) {
            throw new NotFoundException(`Product with ID ${productId} not found in favorites`);
        }
        await favoriteItem.destroy();
    }
}