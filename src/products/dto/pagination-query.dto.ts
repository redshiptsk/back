import {IsOptional, IsNumber, IsString, Min, IsArray, ValidateNested} from 'class-validator';
import {Transform, Type} from 'class-transformer';
import {ApiProperty} from "@nestjs/swagger";

export class FiltersQueryDto {
    @IsOptional()
    @IsNumber()
    categoryId: number;

    @ApiProperty({example: [1, 2]})
    @IsNumber({}, {each: true})
    characteristicValuesIds: number[];
}

export class PaginationQueryDto {
    @IsOptional()
    @IsNumber()
    @Transform(({value}) => parseInt(value))
    @Min(1)
    pageSize?: number;

    @IsOptional()
    @IsNumber()
    @Transform(({value}) => parseInt(value))
    @Min(1)
    page?: number;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Transform(({ value }) => JSON.parse(value))
    @Type(() => FiltersQueryDto)
    filters?: FiltersQueryDto;
}
