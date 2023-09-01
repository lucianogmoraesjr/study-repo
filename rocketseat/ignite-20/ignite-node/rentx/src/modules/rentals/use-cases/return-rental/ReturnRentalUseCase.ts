import { inject, injectable } from 'tsyringe';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { AppError } from '@shared/errors/AppError';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

interface IRequest {
  id: string;
  user_id: string;
}

@injectable()
export class ReturnRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ id, user_id }: IRequest): Promise<Rental> {
    const minimumDaily = 1;

    const rental = await this.rentalsRepository.findById(id);
    const car = await this.carsRepository.findById(rental.car_id);

    if (!rental) {
      throw new AppError('Rental not found.');
    }

    const dateNow = this.dateProvider.dateNow();

    let daily = this.dateProvider.compareInDays(
      rental.start_date,
      this.dateProvider.dateNow(),
    );

    if (daily <= 0) {
      daily = minimumDaily;
    }

    const lateReturn = this.dateProvider.compareInDays(
      rental.expected_return_date,
      dateNow,
    );

    let total = 0;

    if (lateReturn > 0) {
      const calculateFine = lateReturn * car.fine_amount;
      total = calculateFine;
    }

    total += daily * car.daily_rate;

    rental.end_date = this.dateProvider.dateNow();
    rental.total = total;

    await this.rentalsRepository.create(rental);
    await this.carsRepository.updateAvailable(car.id, true);

    return rental;
  }
}
