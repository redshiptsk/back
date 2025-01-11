import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { AddProduct } from './add-product.model';
import { Category } from './category.model';

@Table({ tableName: 'product_categories' })
export class ProductCategory extends Model<ProductCategory> {
  @ForeignKey(() => AddProduct)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId: number;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId: number;

  @BelongsTo(() => AddProduct)
  product: AddProduct;

  @BelongsTo(() => Category)
  category: Category;
}
