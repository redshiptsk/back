import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { extname } from 'path';
import { AddProductService } from './add-product.service';
import { AddProductController } from './add-product.controller';
import { AddProduct } from './add-product.model';
import { ProductCategory } from './add-product-category.model';
import { Category } from './category.model';
import { Characteristic } from './characteristic.model';
import { CharacteristicValue } from './characteristic-value.model';

@Module({
  imports: [
    SequelizeModule.forFeature([
      AddProduct,
      ProductCategory,
      Category,
      Characteristic,
      CharacteristicValue,
    ]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = `${uuid()}${extname(file.originalname)}`;
          callback(null, uniqueSuffix);
        },
      }),
    }),
  ],
  providers: [AddProductService],
  controllers: [AddProductController],
})
export class AddProductModule {}
