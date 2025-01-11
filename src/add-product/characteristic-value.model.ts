import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Characteristic } from './characteristic.model';

@Table({ tableName: 'characteristic_values' })
export class CharacteristicValue extends Model<CharacteristicValue> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ForeignKey(() => Characteristic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  characteristicId: number;

  @BelongsTo(() => Characteristic)
  characteristic: Characteristic;
}
