import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../entities/user.model';
import * as bcrypt from 'bcrypt';
import { UpdateUserProfileDto } from "../dto/update-user-profile.dto";
import * as fs from 'fs';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {
        const uploadDir = './uploads/avatars';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
    }

    async createUser(email: string, username: string, password: string, role: string): Promise<User> {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            return this.userModel.create({ email, username, password: hashedPassword, role });
        } catch (error) {
            this.logger.error('Error creating user', error);
            throw error;
        }
    }

    async updateProfile(id: number, updateUserProfileDto: UpdateUserProfileDto): Promise<User> {
        try {
            const [updateRows, [updatedUser]] = await this.userModel.update(updateUserProfileDto, {
                where: { id },
                returning: true,
            });
            return updatedUser;
        } catch (error) {
            this.logger.error('Error updating user profile', error);
            throw error;
        }
    }

    async findAll(): Promise<User[]> {
        return this.userModel.findAll();
    }

    async findOne(id: number): Promise<User> {
        return this.userModel.findOne({ where: { id } });
    }
}
