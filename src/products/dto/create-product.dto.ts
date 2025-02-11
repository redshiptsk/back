import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { CreateCharacteristicDto } from '../../characteristics/dto';

export class CreateProductDto {
  @ApiProperty({ example: 'Havic HV G-92 Gamepad' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 192.0 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Product description' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  @IsOptional()
  @IsString()
  image: string;

  @ApiProperty({ example: [1, 2] })
  @Transform(({ value }) => JSON.parse(value))
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @ApiProperty({ example: [{ key: 'Color', values: ['Red', 'Blue'] }] })
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested({ each: true })
  @Type(() => CreateCharacteristicDto)
  characteristics: CreateCharacteristicDto[];

  @ApiProperty({ example: 1 })
  @IsNumber()
  sellerId: number;
}
