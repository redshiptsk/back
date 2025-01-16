import { IsNumber, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CharacteristicsQueryDto {
  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => parseInt(value))
  categoryId?: number;
}
