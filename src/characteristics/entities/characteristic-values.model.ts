import {
  AutoIncrement,
  BelongsTo,
  BelongsToMany,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import {Characteristic} from './characteristics.model';
import {ApiHideProperty, ApiProperty} from '@nestjs/swagger';
import {Product} from "../../products/products.model";
import {ProductCharacteristicValue} from "../../product-characteristic/product-characteristic-value.model";

@Table
export class CharacteristicValue extends Model<CharacteristicValue> {
  @ApiProperty({ example: 134 })
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({ allowNull: false })
  value: string;

  @ApiHideProperty()
  @ForeignKey(() => Characteristic)
  @Column
  characteristicId: number;

  @ApiHideProperty()
  @BelongsTo(() => Characteristic)
  characteristic: Characteristic;

  @ApiHideProperty()
  @BelongsToMany(() => Product, () => ProductCharacteristicValue)
  products: Product[];
}
