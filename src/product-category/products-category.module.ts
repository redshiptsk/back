import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategory } from './product-category.model';
import { ProductCategoryService } from './product-category.service';
import { CategoriesModule } from '../categories/categories.module';

@Module({
  imports: [SequelizeModule.forFeature([ProductCategory]), CategoriesModule],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
