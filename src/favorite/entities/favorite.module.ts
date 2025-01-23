import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import {Product} from "../../products/products.model";
import {FavoriteItem} from "./favorite-item.model";
import {FavoriteService} from "../services/favorite.service";
import {FavoriteController} from "../controllers/favorite.controller";

@Module({
    imports: [SequelizeModule.forFeature([Product, FavoriteItem])],
    providers: [FavoriteService],
    controllers: [FavoriteController],
})
export class FavoriteModule {}
