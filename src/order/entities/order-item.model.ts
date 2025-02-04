import {AllowNull, AutoIncrement, Column, DataType, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Product} from "../../products/products.model";
import {Order} from "./order.model";

@Table
export class OrderItem extends Model {
    @ApiProperty({example: 134})
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Product)
    @Column
    productId: number;

    @ForeignKey(() => Order)
    @Column
    orderId: number;

    @ApiProperty({example: 2})
    @AllowNull(false)
    @Column({defaultValue: 1})
    quantity: number;

    @ApiProperty({example: 192.0})
    @AllowNull(false)
    @Column(DataType.FLOAT)
    price: number;
}
