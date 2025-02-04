import {BelongsTo, Column, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../../products/products.model";
import {User} from "../../users/entities/user.model";

@Table
export class CartItem extends Model<CartItem>{
    @ForeignKey(() => Product)
    @Column
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @Column
    quantity: number;

    @Column
    @ForeignKey(() => User)
    userId: number;
}