import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Logger,
    BadRequestException,
    Res,
} from '@nestjs/common';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import * as path from 'path';
import {Response} from 'express';
import {ApiConsumes, ApiBody, ApiTags} from '@nestjs/swagger';
import {ChatService} from "../services/chat.service";

@ApiTags('chat')
@Controller('chat')
export class ChatController {
    private readonly logger = new Logger(ChatController.name);

    constructor(private readonly chatService: ChatService) {
    }

    @Post('sendImage')
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads/chat-images',
                filename: (req, file, callback) => {
                    const timestamp = Date.now();
                    const ext = path.extname(file.originalname);
                    const baseName = path.basename(file.originalname, ext);
                    const filename = `${baseName}-${timestamp}${ext}`;
                    callback(null, filename);
                },
            }),
            limits: {fileSize: 5 * 1024 * 1024},
        }),
    )
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        schema: {
            type: 'object',
            properties: {
                image: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    })

    async sendImage(
        @UploadedFile() file: Express.Multer.File,
        @Res() res: Response,
    ): Promise<void> {
        try {
            if (!file) {
                throw new BadRequestException('No file uploaded');
            }

            const validImageTypes = ['.jpg', '.jpeg', '.png', '.gif'];
            const fileExtension = path.extname(file.originalname).toLowerCase();
            if (!validImageTypes.includes(fileExtension)) {
                throw new BadRequestException('Invalid file type. Only images are allowed.');
            }

            const imageUrl = `/uploads/chat-images/${file.filename}`;

            await this.chatService.saveMessage({
                sender: 'system',
                text: 'Image sent',
                imageUrl,
            });

            res.status(200).json({imageUrl});
        } catch (error) {
            this.logger.error(`Error uploading image: ${error.message}`);
            res.status(500).json({message: 'Error uploading image'});
        }
    }
}
