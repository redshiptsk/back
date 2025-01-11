import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { CharacteristicValue } from './characteristic-value.model';

@Table({ tableName: 'characteristics' })
export class Characteristic extends Model<Characteristic> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  key: string;

  @HasMany(() => CharacteristicValue)
  values: CharacteristicValue[];
}
