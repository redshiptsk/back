import {AutoIncrement, Column, HasMany, Model, PrimaryKey, Table,} from 'sequelize-typescript';
import {ApiHideProperty, ApiProperty} from '@nestjs/swagger';
import {CharacteristicValue} from './characteristic-values.model';

@Table
export class Characteristic extends Model {
  @ApiProperty({ example: 134 })
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    allowNull: false,
    unique: true,
  })
  key: string;

  @ApiHideProperty()
  @HasMany(() => CharacteristicValue)
  values: CharacteristicValue[];
}
