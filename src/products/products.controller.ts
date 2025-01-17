import {Body, Controller, Get, Post, Query, UploadedFile, UseInterceptors,} from '@nestjs/common';
import {ProductsService} from './products.service';
import {CreateProductDto, PaginatedProductsDto, PaginationQueryDto, ProductDto} from './dto';
import {ApiTags} from '@nestjs/swagger';
import {FileInterceptor} from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import {extname} from 'path';

@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
    ) {
    }

    @Post()
    @UseInterceptors(
        FileInterceptor('image', {
            storage: diskStorage({
                destination: './uploads',
                filename: (req, file, callback) => {
                    try {
                        const uniqueSuffix =
                            Date.now() + '-' + Math.round(Math.random() * 1e9);
                        const ext = extname(file.originalname);
                        const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;
                        callback(null, filename);
                    } catch (e) {
                        console.log(e);
                    }
                },
            }),
        }),
    )
    async addProduct(
        @UploadedFile() image: Express.Multer.File,
        @Body() body: CreateProductDto,
    ): Promise<ProductDto> {
        return await this.productsService.create(body, image);
    }

    @Get('paginated')
    findAndPaginateAll(
        @Query() paginationQuery: PaginationQueryDto,
    ): Promise<PaginatedProductsDto> {
        return this.productsService.findAndPaginateAll(paginationQuery);
    }
}
