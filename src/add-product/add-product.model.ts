//add-product.model.ts
import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { ProductCategory } from './add-product-category.model';

@Table({
  tableName: 'products',
  timestamps: true,
})
export class AddProduct extends Model<AddProduct> {
  @ApiProperty({ example: 'Havic HV G-92 Gamepad' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @ApiProperty({ example: 192.0 })
  @Column({
    type: DataType.FLOAT,
    allowNull: false,
  })
  price: number;

  @ApiProperty({ example: 'Product description' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description: string;

  @ApiProperty({ example: null })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  photo: string | null;

  @HasMany(() => ProductCategory)
  categories: ProductCategory[];
}
