import { ICreateRentalDTO } from '@modules/rentals/dtos/ICreateRentalDTO';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { Rental } from '../entities/Rental';
import { Repository, getRepository } from 'typeorm';

export class RentalsRepository implements IRentalsRepository {
  private ormRepository: Repository<Rental>;

  constructor() {
    this.ormRepository = getRepository(Rental);
  }

  async findOpenRentalByCarId(car_id: string): Promise<Rental> {
    const openRentalByCarId = await this.ormRepository.findOne({
      where: { car_id, end_date: null },
    });
    return openRentalByCarId;
  }

  async findOpenRentalByUserId(user_id: string): Promise<Rental> {
    const openRentalByUserId = await this.ormRepository.findOne({
      where: { user_id, end_date: null },
    });
    return openRentalByUserId;
  }

  async create({
    car_id,
    user_id,
    expected_return_date,
    id,
    end_date,
    total,
  }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.ormRepository.create({
      car_id,
      user_id,
      expected_return_date,
      id,
      end_date,
      total,
    });

    await this.ormRepository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return this.ormRepository.findOne(id);
  }

  async findByUser(user_id: string): Promise<Rental[]> {
    return this.ormRepository.find({ where: { user_id }, relations: ['car'] });
  }
}
