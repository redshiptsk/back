import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateCharacteristicDto {
  @ApiProperty({ example: 'Color' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({ example: ['Red', 'Blue'] })
  @IsArray()
  @IsString({ each: true })
  values: string[];
}
