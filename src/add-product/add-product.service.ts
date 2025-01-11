import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AddProduct } from './add-product.model';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductCategory } from './add-product-category.model';
import { Category } from './category.model';
import { Characteristic } from './characteristic.model';
import { CharacteristicValue } from './characteristic-value.model';
import { Op } from 'sequelize';

@Injectable()
export class AddProductService {
  constructor(
    @InjectModel(AddProduct)
    private readonly productModel: typeof AddProduct,
    @InjectModel(ProductCategory)
    private readonly productCategoryModel: typeof ProductCategory,
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
    @InjectModel(Characteristic)
    private readonly characteristicModel: typeof Characteristic,
    @InjectModel(CharacteristicValue)
    private readonly characteristicValueModel: typeof CharacteristicValue,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File) {
    const photoPath = file ? `/uploads/${file.filename}` : null;

    const product = await this.productModel.create({
      ...createProductDto,
      photo: photoPath,
    });

    if (createProductDto.categoryIds) {
      for (const categoryId of createProductDto.categoryIds) {
        const category = await this.categoryModel.findByPk(categoryId);
        if (!category) {
          throw new Error(`Category with ID ${categoryId} not found`);
        }

        await this.productCategoryModel.create({
          productId: product.id,
          categoryId,
        });
      }
    }

    if (createProductDto.characteristics) {
      for (const char of createProductDto.characteristics) {
        let characteristic = await this.characteristicModel.findOne({
          where: { key: char.key },
        });

        if (!characteristic) {
          characteristic = await this.characteristicModel.create({
            key: char.key,
          });
        }

        for (const value of char.values) {
          const existingValue = await this.characteristicValueModel.findOne({
            where: {
              value,
              characteristicId: characteristic.id,
            },
          });

          if (!existingValue) {
            await this.characteristicValueModel.create({
              value,
              characteristicId: characteristic.id,
            });
          }
        }
      }
    }

    return product;
  }

  async findAll(search: string = ''): Promise<AddProduct[]> {
    const where = {};
    if (search) {
      where['name'] = {
        [Op.like]: `%${search}%`,
      };
    }

    const products = await this.productModel.findAll({
      where,
      include: [
        {
          model: ProductCategory,
          include: [Category],
        },
      ],
    });

    return products;
  }
}
