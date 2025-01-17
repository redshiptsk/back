import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {ProductCategory} from './product-category.model';
import {CreateProductCategoryDto} from './dto';
import {CategoriesService} from '../categories/categories.service';
import {Transaction} from "sequelize";

@Injectable()
export class ProductCategoryService {
    constructor(
        @InjectModel(ProductCategory)
        private productCategoryModel: typeof ProductCategory,
        private readonly categoriesService: CategoriesService,
    ) {
    }

    async create(createProductCategoryDto: CreateProductCategoryDto, transaction?: Transaction) {
        const categoryId = createProductCategoryDto.categoryId;
        const category = await this.categoriesService.findByPk(categoryId);

        if (!category) {
            throw new HttpException(`Category with ID ${categoryId} not found`, HttpStatus.BAD_REQUEST);
        }

        return await this.productCategoryModel.create({
            ...createProductCategoryDto,
        }, {transaction});
    }
}
