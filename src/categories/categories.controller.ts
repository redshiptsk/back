import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiTags} from '@nestjs/swagger';
import {CategoryDto, CreateCategoryDto} from './dto';
import {CategoriesService} from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
  ) {}

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }
}
