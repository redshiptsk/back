import {IsNumber} from "class-validator";
import {Transform} from "class-transformer";

export class CreateOrderQueryDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    userId: number;
}
