import dayjs from 'dayjs';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { RentalsRepositoryInMemory } from '@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { CreateRentalUseCase } from './CreateRentalUseCase';
import { AppError } from '@shared/errors/AppError';
import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

let rentalsRepositoryInMemory: IRentalsRepository;
let dayJsDateProvider: IDateProvider;
let carsRepositoryInMemory: ICarsRepository;
let createRentalUseCase: CreateRentalUseCase;

describe('Create Rental', () => {
  const dayAdd24h = dayjs().add(1, 'day').toDate();
  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    dayJsDateProvider = new DayjsDateProvider();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(
      rentalsRepositoryInMemory,
      dayJsDateProvider,
      carsRepositoryInMemory,
    );
  });

  it('should be able to create a new rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    });

    const rental = await createRentalUseCase.execute({
      user_id: 'user-id',
      car_id: car.id,
      expected_return_date: dayAdd24h,
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if user already has an open rental', async () => {
    const car = await carsRepositoryInMemory.create({
      name: 'car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    });

    await createRentalUseCase.execute({
      user_id: 'user-id',
      car_id: car.id,
      expected_return_date: dayAdd24h,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'user-id',
        car_id: 'another-car-id',
        expected_return_date: dayAdd24h,
      }),
    ).rejects.toEqual(
      new AppError('There is a rental in progress for the user.'),
    );
  });

  it('should not be able to create a new rental if car is unavailable for rental', async () => {
    const car1 = await carsRepositoryInMemory.create({
      name: 'car-name',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1234',
      fine_amount: 60,
      brand: 'car-brand',
      category_id: 'category-id',
    });

    const car2 = await carsRepositoryInMemory.create({
      name: 'car-name-2',
      description: 'description',
      daily_rate: 100,
      license_plate: 'ABC-1235',
      fine_amount: 60,
      brand: 'car-brand-2',
      category_id: 'category-id',
    });

    await createRentalUseCase.execute({
      user_id: 'user-id',
      car_id: car1.id,
      expected_return_date: dayAdd24h,
    });

    await expect(
      createRentalUseCase.execute({
        user_id: 'another-user-id',
        car_id: car2.id,
        expected_return_date: dayAdd24h,
      }),
    ).rejects.toEqual(new AppError('Car unavailable.'));
  });

  it('should not be able to create a new rental if return time is less than 24h', async () => {
    await expect(
      createRentalUseCase.execute({
        user_id: 'user-id',
        car_id: 'car-id',
        expected_return_date: dayjs().toDate(),
      }),
    ).rejects.toEqual(new AppError('Invalid return time.'));
  });
});
