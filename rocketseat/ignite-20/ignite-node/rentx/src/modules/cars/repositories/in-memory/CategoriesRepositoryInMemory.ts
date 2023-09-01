import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  ICategoriesRepositories,
  ICategoryDTO,
} from '../ICategoriesRepository';

export class CategoriesRepositoryInMemory implements ICategoriesRepositories {
  categories: Category[] = [];

  async create({ name, description }: ICategoryDTO): Promise<void> {
    const category = new Category();

    Object.assign(category, { name, description });

    this.categories.push(category);
  }
  async list(): Promise<Category[]> {
    return this.categories;
  }
  async findByName(name: string): Promise<Category> {
    const category = this.categories.find(category => category.name === name);
    return category;
  }
}
