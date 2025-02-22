import { IsEmail, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'korolknopok' })
    @IsString()
    username: string;

    @ApiProperty({ example: 'password123' })
    @IsString()
    @MinLength(6)
    password: string;

    @ApiProperty({ example: 'admin' })
    @IsString()
    role: string;
}
