import { inject, injectable } from 'tsyringe';
import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepositories } from '@modules/cars/repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject('CategoriesRepository')
    private categoriesRepository: ICategoriesRepositories,
  ) {}

  async execute({ name, description }: IRequest) {
    const categoryAlreadyExists = await this.categoriesRepository.findByName(
      name,
    );

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists.');
    }

    await this.categoriesRepository.create({ name, description });
  }
}
