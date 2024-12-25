import { Controller, Get, Post, Body, Param, Put, UseInterceptors, UploadedFile, Logger, BadRequestException, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from '../services/users.service';
import { User } from '../entities/user.model';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiBody, ApiTags, ApiResponse, ApiConsumes } from '@nestjs/swagger';
import { UpdateUserProfileDto } from "../dto/update-user-profile.dto";
import { diskStorage } from 'multer';
import * as path from 'path';
import { Response } from 'express';

@ApiTags('users')
@Controller('users')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);

    constructor(private readonly usersService: UsersService) {}

    @Post()
    @ApiBody({ type: CreateUserDto })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.usersService.createUser(createUserDto.email, createUserDto.username, createUserDto.password, createUserDto.role);
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The found users.', type: [User] })
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The found user.', type: User })
    async findOne(@Param('id') id: number): Promise<User> {
        return this.usersService.findOne(id);
    }

    @Put(':id/profile')
    @ApiBody({ type: UpdateUserProfileDto })
    @ApiResponse({ status: 200, description: 'The user profile has been successfully updated.', type: User })
    async updateProfile(@Param('id') id: number, @Body() updateUserProfileDto: UpdateUserProfileDto): Promise<User> {
        try {
            this.logger.log(`Updating profile for user ${id} with data: ${JSON.stringify(updateUserProfileDto)}`);

            const result = await this.usersService.updateProfile(id, updateUserProfileDto);

            let updatedUser: User;
            if (Array.isArray(result)) {
                const [updateRows, users] = result;
                updatedUser = users[0];
            } else {
                updatedUser = result;
            }

            if (!updatedUser) {
                throw new Error(`User with id ${id} not found or update failed`);
            }

            this.logger.log(`Profile updated successfully for user ${id}`);
            return updatedUser;
        } catch (error) {
            this.logger.error(`Error updating profile for user ${id}: ${error.message}`);
            throw error;
        }
    }

    @Post(':id/upload-avatar')
    @UseInterceptors(FileInterceptor('avatar', {
        storage: diskStorage({
            destination: './uploads/avatars',
            filename: (req, file, callback) => {
                const filename = `${Date.now()}-${file.originalname}`;
                callback(null, filename);
            }
        }),
        limits: { fileSize: 5 * 1024 * 1024 },
    }))

    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                avatar: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })
    @ApiResponse({ status: 200, description: 'User avatar uploaded successfully.' })
    async uploadAvatar(@Param('id') id: number, @UploadedFile() file: Express.Multer.File, @Res() res: Response): Promise<void> {
        try {
            if (!file) {
                this.logger.error(`Avatar file not uploaded for user ${id}`);
                throw new BadRequestException('No avatar file uploaded');
            }

            const validImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];
            const fileExtension = path.extname(file.originalname).toLowerCase();
            if (!validImageTypes.includes(fileExtension)) {
                this.logger.error(`Invalid file type uploaded for user ${id}: ${fileExtension}`);
                throw new BadRequestException('Invalid file type uploaded. Only image files are allowed.');
            }

            const avatarUrl = `/uploads/avatars/${file.filename}`;
            this.logger.log(`Avatar uploaded successfully for user ${id}: ${avatarUrl}`);

            const updatedUser = await this.usersService.updateProfile(id, { photoUrl: avatarUrl });

            res.status(200).json(updatedUser);
        } catch (error) {
            this.logger.error(`Error uploading avatar for user ${id}: ${error.message}`);
            res.status(500).json({ message: 'Error uploading avatar' });
        }
    }
}
