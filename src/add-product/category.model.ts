import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { ProductCategory } from './add-product-category.model';

@Table({ tableName: 'categories' })
export class Category extends Model<Category> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @HasMany(() => ProductCategory)
  productCategories: ProductCategory[];
}
