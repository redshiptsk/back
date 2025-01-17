import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {Product} from './products.model';
import {ProductsController} from './products.controller';
import {ProductsService} from './products.service';
import {MulterModule} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';
import {v4 as uuid} from 'uuid';
import {ProductCategoryModule} from '../product-category/products-category.module';
import {CategoriesModule} from '../categories/categories.module';
import {CharacteristicsModule} from '../characteristics/characteristics.module';
import {ProductCharacteristicModule} from "../product-characteristic/product-characteristic.module";

@Module({
    imports: [
        SequelizeModule.forFeature([Product]),
        MulterModule.register({
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${uuid()}${extname(file.originalname)}`;
                    callback(null, uniqueSuffix);
                },
            }),
        }),
        ProductCategoryModule,
        CategoriesModule,
        CharacteristicsModule,
        ProductCharacteristicModule,
    ],
    controllers: [ProductsController],
    providers: [ProductsService],
})
export class ProductsModule {
}
