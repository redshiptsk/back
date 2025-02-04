import {
    AllowNull,
    AutoIncrement,
    Column,
    DataType,
    HasMany,
    HasOne,
    Model,
    PrimaryKey,
    Table
} from "sequelize-typescript";
import {ApiHideProperty, ApiProperty} from "@nestjs/swagger";
import {OrderItem} from "./order-item.model";
import {Payment} from "./payment.model";


export enum EOrderStatus {
    processing = 'processing',
    payment = 'payment',
    accepted = 'accepted',
    sent = 'sent',
    delivered = 'delivered',
}

@Table
export class Order extends Model {
    @ApiProperty({example: 134})
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ApiProperty({example: 'Elizarov 74, Tomsk'})
    @AllowNull(false)
    @Column
    deliveryAddress: string;

    @ApiProperty({example: 'accepted'})
    @AllowNull(false)
    @Column
    status: EOrderStatus;

    @ApiProperty({example: 102.3})
    @AllowNull(false)
    @Column({type: DataType.FLOAT,defaultValue: 0})
    totalAmount: number;

    @ApiProperty({example: 5.4})
    @AllowNull(false)
    @Column({type: DataType.FLOAT,defaultValue: 0})
    deliveryPrice: number;

    @ApiHideProperty()
    @HasOne(() => Payment)
    payment: Payment;

    @ApiHideProperty()
    @HasMany(() => OrderItem)
    orderItems: OrderItem[];
}
