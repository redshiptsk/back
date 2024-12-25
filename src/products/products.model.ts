import {
  AllowNull,
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

@Table
export class Product extends Model {
  @ApiProperty({ example: 134 })
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ApiProperty({ example: 'Havic HV G-92 Gamepad' })
  @AllowNull(false)
  @Column
  name: string;

  @ApiProperty({
    example:
      'PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.',
  })
  @AllowNull(false)
  @Column(DataType.TEXT)
  description: string;

  @ApiProperty({ example: 192.0 })
  @AllowNull(false)
  @Column
  price: number;

  @ApiProperty({ example: 10 })
  @Column
  discount: number;

  @ApiProperty({
    example: 'img_dkgffn234426342lf',
  })
  @AllowNull(false)
  @Column
  image: string;

  @ApiProperty({ example: 4 })
  @AllowNull(false)
  @Column
  count: number;

  @ApiHideProperty()
  rating: number;

  @ApiHideProperty()
  reviews: number;
}
