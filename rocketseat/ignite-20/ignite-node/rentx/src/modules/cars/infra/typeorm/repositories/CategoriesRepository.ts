import { Repository, getRepository } from 'typeorm';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  ICategoriesRepositories,
  ICategoryDTO,
} from '@modules/cars/repositories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepositories {
  private ormRepository: Repository<Category>;

  constructor() {
    this.ormRepository = getRepository(Category);
  }

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = this.ormRepository.create({
      name,
      description,
    });

    await this.ormRepository.save(category);
  }

  async list(): Promise<Category[]> {
    const categories = await this.ormRepository.find();
    return categories;
  }

  async findByName(name: string): Promise<Category> | undefined {
    const category = await this.ormRepository.findOne({ name });

    return category;
  }
}
