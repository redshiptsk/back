import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Product} from './products.model';
import {CreateProductDto,} from './dto';
import {ProductCategoryService} from '../product-category/product-category.service';
import {ProductCharacteristicService} from "../product-characteristic/product-characteristic.service";
import {Sequelize} from "sequelize-typescript";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        private readonly productCategoryService: ProductCategoryService,
        private readonly productCharacteristicService: ProductCharacteristicService,
        private readonly sequelize: Sequelize,
    ) {
    }

    async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
        const imagePath = file ? `/uploads/${file.filename}` : null;

        try {
            const result = await this.sequelize.transaction(async transaction => {

                const product = await this.productModel.create({
                    ...createProductDto,
                    image: imagePath,
                }, {transaction});

                if (createProductDto.categoryIds) {
                    for (const categoryId of createProductDto.categoryIds) {
                        await this.productCategoryService.create({
                            productId: product.id,
                            categoryId,
                        }, transaction);
                    }
                }

                if (createProductDto.characteristics) {
                    for (const characteristic of createProductDto.characteristics) {
                        await this.productCharacteristicService.create({
                            productId: product.id,
                            characteristic,
                        }, transaction);
                    }
                }

                return product;
            });

            return result;
        } catch (error) {
            throw new Error(error);
        }
    }
}
