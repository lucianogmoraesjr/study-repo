import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let carsRepositoryInMemory: ICarsRepository;
let listAvailableCarsUseCase: ListAvailableCarsUseCase;
describe('List Available Cars', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listAvailableCarsUseCase = new ListAvailableCarsUseCase(
      carsRepositoryInMemory,
    );
  });

  it('should be able to list all available cars', async () => {
    await Promise.all([
      carsRepositoryInMemory.create({
        name: 'car-name-1',
        brand: 'car-brand-1',
        description: 'car-description-1',
        license_plate: 'license-plate-1',
        fine_amount: 100,
        daily_rate: 50,
        category_id: 'category_id',
      }),
      carsRepositoryInMemory.create({
        name: 'car-name-2',
        brand: 'car-brand-2',
        description: 'car-description-2',
        license_plate: 'license-plate-2',
        fine_amount: 100,
        daily_rate: 50,
        category_id: 'category_id',
      }),
    ]);

    const cars = await listAvailableCarsUseCase.execute({});

    expect(cars.length).toBe(2);
  });

  it('should be able to list all available cars by name', async () => {
    await Promise.all([
      carsRepositoryInMemory.create({
        name: 'car-name-1',
        brand: 'car-brand-1',
        description: 'car-description-1',
        license_plate: 'license-plate-1',
        fine_amount: 100,
        daily_rate: 50,
        category_id: 'category_id',
      }),
      carsRepositoryInMemory.create({
        name: 'car-name-2',
        brand: 'car-brand-2',
        description: 'car-description-2',
        license_plate: 'license-plate-2',
        fine_amount: 100,
        daily_rate: 50,
        category_id: 'category_id',
      }),
    ]);

    const cars = await listAvailableCarsUseCase.execute({ name: 'car-name-1' });

    expect(cars.length).toBe(1);
  });

  it('should be able to list all available cars by brand', async () => {
    await Promise.all([
      carsRepositoryInMemory.create({
        name: 'car-name-1',
        brand: 'car-brand-1',
        description: 'car-description-1',
        license_plate: 'license-plate-1',
        fine_amount: 100,
        daily_rate: 50,
        category_id: 'category_id',
      }),
      carsRepositoryInMemory.create({
        name: 'car-name-2',
        brand: 'car-brand-2',
        description: 'car-description-2',
        license_plate: 'license-plate-2',
        fine_amount: 100,
        daily_rate: 50,
        category_id: 'category_id',
      }),
    ]);
    const cars = await listAvailableCarsUseCase.execute({
      brand: 'car-brand-2',
    });

    expect(cars.length).toBe(1);
  });

  it('should be able to list all available cars by category', async () => {
    await Promise.all([
      carsRepositoryInMemory.create({
        name: 'car-name-1',
        brand: 'car-brand-1',
        description: 'car-description-1',
        license_plate: 'license-plate-1',
        fine_amount: 100,
        daily_rate: 50,
        category_id: '123456',
      }),
      carsRepositoryInMemory.create({
        name: 'car-name-2',
        brand: 'car-brand-2',
        description: 'car-description-2',
        license_plate: 'license-plate-2',
        fine_amount: 100,
        daily_rate: 50,
        category_id: '654321',
      }),
    ]);

    const cars = await listAvailableCarsUseCase.execute({
      category_id: '654321',
    });

    expect(cars.length).toBe(1);
  });
});
