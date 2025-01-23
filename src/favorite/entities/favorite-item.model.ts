import { Column, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Product } from '../../products/products.model';

@Table
export class FavoriteItem extends Model<FavoriteItem> {
    @ForeignKey(() => Product)
    @Column
    productId: number;

    @Column
    userId: number;

    @BelongsTo(() => Product)
    product: Product;
}