import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  ValidateNested,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';

class CharacteristicDto {
  @ApiProperty({ example: 'Color' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: ['Red', 'Blue'] })
  @IsArray()
  @IsString({ each: true })
  values: string[];
}

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

  @ApiProperty({ example: null })
  @IsOptional()
  @IsString()
  photo: string | null;

  @ApiProperty({ example: [1, 2] })
  @IsArray()
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @ApiProperty({ example: [{ key: 'Color', values: ['Red', 'Blue'] }] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CharacteristicDto)
  characteristics: CharacteristicDto[];
}
