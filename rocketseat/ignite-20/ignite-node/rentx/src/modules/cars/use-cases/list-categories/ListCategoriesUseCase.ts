import { inject, injectable } from 'tsyringe';
import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import { ICategoriesRepositories } from '@modules/cars/repositories/ICategoriesRepository';

@injectable()
export class ListCategoriesUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepositories,
  ) {}

  async execute(): Promise<Category[] | undefined> {
    const categories = await this.categoriesRepository.list();

    return categories;
  }
}
