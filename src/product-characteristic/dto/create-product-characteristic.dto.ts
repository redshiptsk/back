import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateCharacteristicDto } from '../../characteristics/dto';

export class CreateProductCharacteristicDto {
  @ApiProperty({ example: 123 })
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @ApiProperty({ example: [{ key: 'Color', values: ['Red', 'Blue'] }] })
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested({ each: true })
  @Type(() => CreateCharacteristicDto)
  characteristic: CreateCharacteristicDto;
}
