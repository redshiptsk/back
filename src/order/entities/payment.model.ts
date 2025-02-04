import {AllowNull, AutoIncrement, Column, ForeignKey, Model, PrimaryKey, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Order} from "./order.model";


export enum EPaymentMethod {
    byCard = 'by card',
    uponReceiptByCard = 'by card upon receipt',
    uponReceiptByCash = 'by cash upon receipt',
}

@Table
export class Payment extends Model {
    @ApiProperty({example: 134})
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @ForeignKey(() => Order)
    @Column
    orderId: number;

    @ApiProperty({example: 'by card'})
    @AllowNull(false)
    @Column
    method: EPaymentMethod;

    @ApiProperty({example: '07e0082d-0179-432b-9833-b8ba1e832343'})
    @AllowNull(false)
    @Column
    transaction: string;
}
