import {
  PaginatedProductsDto,
  PaginationQueryDto,
  ProductDto,
} from '../../dto';
import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';

@Injectable()
export class ProductsMockService {
  async findAndPaginateAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedProductsDto> {
    const { pageSize = 10, page = 1, search = '' } = paginationQuery;
    const filePath = 'src/products/lib/mocks/products.json';

    try {
      const dataString = fs.readFileSync(filePath, 'utf8');
      let data: ProductDto[] = JSON.parse(dataString);

      if (search) {
        const lowerCaseSearch = search.toLowerCase();
        data = data.filter((product) =>
          product.name.toLowerCase().includes(lowerCaseSearch),
        );
      }

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedProducts = data.slice(startIndex, endIndex);

      return {
        data: paginatedProducts,
        totalPages: Math.ceil(data.length / pageSize),
      };
    } catch (error) {
      console.error('Error reading or processing data:', error);
      return { data: [], totalPages: 0 };
    }
  }
}
