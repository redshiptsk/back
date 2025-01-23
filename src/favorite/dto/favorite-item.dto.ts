import {IsInt} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class FavoriteItemDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    readonly productId: number;
}