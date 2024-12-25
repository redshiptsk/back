import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { LoginDto } from '../dto/login.dto';
import { Op } from 'sequelize';
import { User } from 'src/users/entities/user.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async findByIdentifier(identifier: string): Promise<User | null> {
        return this.userModel.findOne({
            where: {
                [Op.or]: [
                    { username: identifier },
                    { phoneNumber: identifier },
                    { email: identifier },
                ],
            },
        });
    }

    async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(password, hashedPassword);
    }

    async validateUser(loginDto: LoginDto): Promise<any> {
        const { identifier, password } = loginDto;
        const user = await this.findByIdentifier(identifier);
        if (user && await this.validatePassword(password, user.password)) {
            return user;
        }
        return null;
    }
}