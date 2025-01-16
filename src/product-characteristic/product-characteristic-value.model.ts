import {Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Product} from '../products/products.model';
import {CharacteristicValue} from '../characteristics/entities';

@Table
export class ProductCharacteristicValue extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => CharacteristicValue)
  @Column
  characteristicValueId: number;
}
