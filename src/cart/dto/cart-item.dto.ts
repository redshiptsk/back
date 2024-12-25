import {IsInt, IsPositive} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CartItemDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    readonly productId: number;

    @ApiProperty({ example: 2 })
    @IsInt()
    @IsPositive()
    readonly quantity: number;
}