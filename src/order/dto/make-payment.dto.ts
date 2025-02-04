import {IsEnum, IsNumber} from "class-validator";
import {Transform} from "class-transformer";
import {EPaymentMethod} from "../entities";
import {ApiProperty} from "@nestjs/swagger";

export class MakePaymentQueryDto {
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    orderId: number;

    @ApiProperty({example: EPaymentMethod.byCard})
    @IsEnum(EPaymentMethod)
    method: EPaymentMethod;
}
