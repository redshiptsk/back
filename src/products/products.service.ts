import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Product } from "./products.model";
import {
  CreateProductDto,
  PaginatedProductsDto,
  PaginationQueryDto,
} from "./dto";
import { ProductCategoryService } from "../product-category/product-category.service";
import { ProductCharacteristicService } from "../product-characteristic/product-characteristic.service";
import { Sequelize } from "sequelize-typescript";
import { Op } from "sequelize";
import { Category } from "../categories/categories.model";
import { CharacteristicValue } from "../characteristics/entities";

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
    private readonly productCategoryService: ProductCategoryService,
    private readonly productCharacteristicService: ProductCharacteristicService,
    private readonly sequelize: Sequelize
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const imagePath = file ? `/uploads/${file.filename}` : null;

    try {
      const result = await this.sequelize.transaction(async (transaction) => {
        const product = await this.productModel.create(
          {
            ...createProductDto,
            image: imagePath,
          },
          { transaction }
        );

        if (createProductDto.categoryIds) {
          for (const categoryId of createProductDto.categoryIds) {
            await this.productCategoryService.create(
              {
                productId: product.id,
                categoryId,
              },
              transaction
            );
          }
        }

        if (createProductDto.characteristics) {
          for (const characteristic of createProductDto.characteristics) {
            await this.productCharacteristicService.create(
              {
                productId: product.id,
                characteristic,
              },
              transaction
            );
          }
        }

        return product;
      });

      return result;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAndPaginateAll(
    paginationQuery: PaginationQueryDto
  ): Promise<PaginatedProductsDto> {
    console.info(JSON.stringify(paginationQuery));

    const { categoryId, characteristicValuesIds = [] } =
      paginationQuery.filters ?? {};
    const { pageSize = 10, page = 1, search = "" } = paginationQuery;

    const where = {};
    if (search) {
      where["name"] = {
        [Op.like]: `%${search}%`,
      };
    }

    const offset = pageSize * (page - 1);

    const { rows: data, count } = await this.productModel.findAndCountAll({
      where,
      limit: pageSize,
      offset,
      include: [
        {
          model: Category,
          attributes: [],
          where: categoryId ? { id: categoryId } : undefined,
        },
        {
          model: CharacteristicValue,
          attributes: [],
          where: characteristicValuesIds.length
            ? { id: { [Op.in]: characteristicValuesIds } }
            : undefined,
        },
      ],
    });

    return { data, totalPages: Math.ceil(count / pageSize) };
  }

  async findSellerProducts(sellerId: number) {
    const data = await this.productModel.findAll({
      where: { sellerId },
    });
    return { data };
  }
}
