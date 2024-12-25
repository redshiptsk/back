import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { ProductsMockService } from './lib/mocks/products.mock.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsMockService],
})
export class ProductsModule {}
