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
import {Category} from './categories/categories.model';
import {CategoriesModule} from './categories/categories.module';
import {CharacteristicsModule} from './characteristics/characteristics.module';
import {ProductCategory} from './product-category/product-category.model';
import {Characteristic, CharacteristicValue,} from './characteristics/entities';
import {ProductCategoryModule} from './product-category/products-category.module';
import {ProductCharacteristicValue} from "./product-characteristic/product-characteristic-value.model";
import {ProductCharacteristicModule} from "./product-characteristic/product-characteristic.module";
import {ChatModule} from './chat/chat.module';
import {FavoriteModule} from "./favorite/entities/favorite.module";
import {OrderModule} from './order/order.module';
import {Order, OrderItem, Payment} from "./order/entities";


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
                Category,
                ProductCategory,
                Characteristic,
                CharacteristicValue,
                ProductCharacteristicValue,
                OrderItem,
                Order,
                Payment,
            ],
            autoLoadModels: true,
            synchronize: true,
        }),
        UsersModule,
        AuthModule,
        ProductsModule,
        CartModule,
        CategoriesModule,
        CharacteristicsModule,
        ProductCategoryModule,
        ProductCharacteristicModule,
        FavoriteModule,
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'uploads'),
            serveRoot: '/uploads',
        }),
        ChatModule,
        OrderModule,
    ],
})
export class AppModule {
}
