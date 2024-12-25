import { Controller, Post, Body, Logger } from '@nestjs/common';
import {AuthService} from "../services/auth.service";
import {LoginDto} from "../dto/login.dto";

@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        this.logger.log('Received login data:', loginDto);
        return this.authService.validateUser(loginDto);
    }
}
