import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Product} from './products.model';
import {CreateProductDto,} from './dto';
import {ProductCategoryService} from '../product-category/product-category.service';
import {ProductCharacteristicService} from "../product-characteristic/product-characteristic.service";

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
        private readonly productCategoryService: ProductCategoryService,
        private readonly productCharacteristicService: ProductCharacteristicService,
    ) {
    }

    async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
        const imagePath = file ? `/uploads/${file.filename}` : null;

        const product = await this.productModel.create({
            ...createProductDto,
            image: imagePath,
        });

        if (createProductDto.categoryIds) {
            for (const categoryId of createProductDto.categoryIds) {
                await this.productCategoryService.create({
                    productId: product.id,
                    categoryId,
                });
            }
        }

        if (createProductDto.characteristics) {
            for (const characteristic of createProductDto.characteristics) {
                await this.productCharacteristicService.create({
                    productId: product.id,
                    characteristic,
                });
            }
        }

        return product;
    }
}
