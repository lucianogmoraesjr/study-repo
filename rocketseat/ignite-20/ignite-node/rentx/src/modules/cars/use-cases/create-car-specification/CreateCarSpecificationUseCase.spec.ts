import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { SpecificationsRepositoryInMemory } from '@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';
import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let carsRepositoryInMemory: ICarsRepository;
let specificationsRepositoryInMemory: ISpecificationsRepository;
let createCarSpecificatinUseCase: CreateCarSpecificationUseCase;

describe('Create Car Specification', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificatinUseCase = new CreateCarSpecificationUseCase(
      carsRepositoryInMemory,
      specificationsRepositoryInMemory,
    );
  });

  it('should be able to add a new specification in a car', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    });

    const specification = await specificationsRepositoryInMemory.create({
      name: 'specification-name',
      description: 'specification-description',
    });

    const specifications_id = [specification.id];

    const specificationsCars = await createCarSpecificatinUseCase.execute({
      car_id: car.id,
      specifications_id,
    });

    expect(specificationsCars).toHaveProperty('specifications');
    expect(specificationsCars.specifications.length).toBe(1);
  });

  it('should not be able to add a new specification in a non-existent car', async () => {
    const car_id = 'car-id';
    const specifications_id = ['specification-id'];

    await expect(
      createCarSpecificatinUseCase.execute({ car_id, specifications_id }),
    ).rejects.toEqual(new AppError('Car does not exists.'));
  });
});
