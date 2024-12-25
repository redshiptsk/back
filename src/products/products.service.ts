import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { PaginatedProductsDto, PaginationQueryDto } from './dto';
import { Op } from 'sequelize';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async findAndPaginateAll(
    paginationQuery: PaginationQueryDto,
  ): Promise<PaginatedProductsDto> {
    const { pageSize = 10, page = 1, search = '' } = paginationQuery;

    const where = {};
    if (search) {
      where['name'] = {
        [Op.like]: `%${search}%`,
      };
    }

    const offset = pageSize * (page - 1);

    const { rows: data, count } = await this.productModel.findAndCountAll({
      where,
      limit: pageSize,
      offset,
    });

    return { data, totalPages: Math.ceil(count / pageSize) };
  }
}
