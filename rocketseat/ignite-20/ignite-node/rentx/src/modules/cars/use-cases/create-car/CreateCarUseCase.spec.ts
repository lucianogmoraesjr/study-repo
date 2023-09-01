import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarUseCase } from './CreateCarUseCase';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { AppError } from '@shared/errors/AppError';

let carsRepositoryInMemory: ICarsRepository;
let createCarUseCase: CreateCarUseCase;

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    });

    expect(car).toHaveProperty('id');
    expect(car.name).toBe('car-name');
  });

  it('should not be able to create a car if license plate already exists', async () => {
    const car1 = {
      name: 'car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    };

    await createCarUseCase.execute(car1);

    const car2 = {
      name: 'other-car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    };

    await expect(createCarUseCase.execute(car2)).rejects.toEqual(
      new AppError('Car already exists.'),
    );
  });

  it('should be able to create a new car with available true by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    });

    expect(car.available).toBeTruthy();
  });
});
