import { AppError } from '@shared/errors/AppError';
import { ICategoriesRepositories } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepositoryInMemory } from '@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory';
import { CreateCategoryUseCase } from './CreateCategoryUseCase';

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: ICategoriesRepositories;

describe('Create Category', () => {
  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(
      categoriesRepositoryInMemory,
    );
  });

  it('should be able to create a category', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute(category);

    const categoryCreated = await categoriesRepositoryInMemory.findByName(
      category.name,
    );

    expect(categoryCreated).toBeTruthy();
    expect(categoryCreated).toHaveProperty('id');
  });

  it('should not be able to create a category if already exists', async () => {
    const category = {
      name: 'Category Test',
      description: 'Category description test',
    };

    await createCategoryUseCase.execute(category);

    expect(createCategoryUseCase.execute(category)).rejects.toEqual(
      new AppError('Category already exists.'),
    );
  });
});
