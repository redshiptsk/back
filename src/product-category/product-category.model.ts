import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from '../products/products.model';
import { Category } from '../categories/categories.model';

@Table
export class ProductCategory extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}
