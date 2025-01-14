import { ApiProperty } from "@nestjs/swagger";
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from "class-validator";
import { Transform, Type } from "class-transformer";

class CharacteristicDto {
  @ApiProperty({ example: "Color" })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: ["Red", "Blue"] })
  @IsArray()
  @IsString({ each: true })
  values: string[];
}

export class CreateProductDto {
  @ApiProperty({ example: "Havic HV G-92 Gamepad" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 192.0 })
  @IsNumber()
  price: number;

  @ApiProperty({ example: "Product description" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: "string", format: "binary" })
  @IsOptional()
  @IsString()
  photo: string;

  @ApiProperty({ example: [1, 2] })
  @Transform(({ value }) => JSON.parse(value))
  @IsNumber({}, { each: true })
  categoryIds: number[];

  @ApiProperty({ example: [{ key: "Color", values: ["Red", "Blue"] }] })
  @Transform(({ value }) => JSON.parse(value))
  @ValidateNested({ each: true })
  @Type(() => CharacteristicDto)
  characteristics: CharacteristicDto[];
}
