import { Table, Column, Model, AllowNull, Unique } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';

@Table
export class User extends Model<User> {
    @ApiProperty({ example: 'user@example.com' })
    @AllowNull(false)
    @Unique
    @Column
    email: string;

    @ApiProperty({ example: 'korolknopok' })
    @AllowNull(false)
    @Unique
    @Column
    username: string;

    @ApiProperty({ example: 'password123' })
    @AllowNull(false)
    @Column
    password: string;

    @ApiProperty({ example: 'admin' })
    @AllowNull(false)
    @Column
    role: string;

    @ApiProperty({ example: 'John' })
    @Column
    firstname: string;

    @ApiProperty({ example: 'Doe' })
    @Column
    lastname: string;

    @ApiProperty({ example: '+1234567890' })
    @Unique
    @Column
    phoneNumber?: string;

    @ApiProperty({ example: 'https://example.com/photo.jpg' })
    @Column
    photoUrl?: string;

    @ApiProperty({ example: 'Elizarov 74, Tomsk' })
    @Column
    deliveryAddress?: string;
}
