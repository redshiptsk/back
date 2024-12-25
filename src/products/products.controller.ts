import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { PaginatedProductsDto, PaginationQueryDto } from './dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductsMockService } from './lib';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productsMockService: ProductsMockService,
  ) {}

  @Get('paginated')
  findAndPaginateAll(
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedProductsDto> {
    return this.productsMockService.findAndPaginateAll(paginationQuery);
  }
}
