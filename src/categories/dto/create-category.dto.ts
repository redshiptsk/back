import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'electronics' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
