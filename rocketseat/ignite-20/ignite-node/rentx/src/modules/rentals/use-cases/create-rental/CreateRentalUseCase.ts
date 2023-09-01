import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
export class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,

    @inject('DateProvider')
    private dateProvider: IDateProvider,

    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({
    car_id,
    user_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const minimumRentalTime = 24;

    const openRentalForCar = await this.rentalsRepository.findOpenRentalByCarId(
      car_id,
    );

    if (openRentalForCar) {
      throw new AppError('Car unavailable.');
    }

    const openRentalForUser =
      await this.rentalsRepository.findOpenRentalByUserId(user_id);

    if (openRentalForUser) {
      throw new AppError('There is a rental in progress for the user.');
    }

    const dateNow = this.dateProvider.dateNow();

    const compareTime = this.dateProvider.compareInHours(
      dateNow,
      expected_return_date,
    );

    if (compareTime < minimumRentalTime) {
      throw new AppError('Invalid return time.');
    }

    const rental = await this.rentalsRepository.create({
      user_id,
      car_id,
      expected_return_date,
    });

    await this.carsRepository.updateAvailable(car_id, false);

    return rental;
  }
}
