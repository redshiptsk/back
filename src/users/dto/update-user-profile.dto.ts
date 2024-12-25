import { IsOptional, IsString, IsUrl, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserProfileDto {
    @ApiProperty({ example: 'John' })
    @IsOptional()
    @IsString()
    firstname?: string;

    @ApiProperty({ example: 'Doe' })
    @IsOptional()
    @IsString()
    lastname?: string;

    @ApiProperty({ example: '+1234567890' })
    @IsOptional()
    @IsString()
    phoneNumber?: string;

    @ApiProperty({ example: 'https://example.com/photo.jpg' })
    @IsOptional()
    @IsUrl()
    photoUrl?: string;

    @ApiProperty({ example: 'Elizarov 74, Tomsk' })
    @IsOptional()
    @IsString()
    deliveryAddress?: string;

    @ApiProperty({ example: 'user@example.com' })
    @IsOptional()
    @IsEmail()
    email?: string;
}
