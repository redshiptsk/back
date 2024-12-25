import { ProductDto } from './product.dto';

export class PaginatedProductsDto {
  data: ProductDto[];
  totalPages: number;
}
