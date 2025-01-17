import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Category} from './categories.model';
import {CategoryDto, CreateCategoryDto} from './dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<CategoryDto> {
    const category = await this.categoryModel.create({ ...createCategoryDto });

    return category;
  }

  async findAll(): Promise<CategoryDto[]> {
    const categories = await this.categoryModel.findAll();
    return categories;
  }

  async findByPk(categoryId: number): Promise<CategoryDto> {
    return await this.categoryModel.findByPk(categoryId);
  }
}
