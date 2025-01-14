import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {UsersModule} from './users/users.module';
import {ProductsModule} from './products/products.module';
import {User} from './users/entities/user.model';
import {ServeStaticModule} from '@nestjs/serve-static';
import {join} from 'path';
import {Product} from './products/products.model';
import {ConfigModule} from '@nestjs/config';
import {AuthModule} from './auth/entities/auth.module';
import {CartModule} from './cart/entities/cart.module';
import {AddProductModule} from './add-product/add-product.module';
import {AddProduct} from './add-product/add-product.model';
import {ProductCategory} from './add-product/add-product-category.model';
import {Category} from './add-product/category.model';
import {Characteristic} from './add-product/characteristic.model';
import {CharacteristicValue} from './add-product/characteristic-value.model';
import {ChatGateway} from './chat/chat.gateway';

@Module({
    imports: [
        ConfigModule.forRoot(),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.DB_HOST,
            port: Number(process.env.DB_PORT),
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            models: [
                User,
                Product,
                AddProduct,
                ProductCategory,
                Category,
                Characteristic,
                CharacteristicValue,
            ],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        ProductsModule,
        CartModule,
        AddProductModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
    ],
    providers: [ChatGateway],
})
export class AppModule {}
