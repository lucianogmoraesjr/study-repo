import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Car } from '../entities/Car';
import { Repository, getRepository } from 'typeorm';

export class CarsRepository implements ICarsRepository {
  private ormRepository: Repository<Car>;

  constructor() {
    this.ormRepository = getRepository(Car);
  }

  async create({
    name,
    brand,
    category_id,
    daily_rate,
    description,
    fine_amount,
    license_plate,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = this.ormRepository.create({
      name,
      brand,
      category_id,
      daily_rate,
      description,
      fine_amount,
      license_plate,
      specifications,
      id,
    });

    await this.ormRepository.save(car);

    return car;
  }
  async findByLicensePlate(license_plate: string): Promise<Car> {
    const car = await this.ormRepository.findOne({ license_plate });

    return car;
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    const carsQuery = this.ormRepository
      .createQueryBuilder('cars')
      .where('available = :available', { available: true });

    if (brand) {
      carsQuery.andWhere('cars.brand = :brand', { brand });
    }

    if (name) {
      carsQuery.andWhere('cars.name = :name', { name });
    }

    if (category_id) {
      carsQuery.andWhere('cars.category_id = :category_id', { category_id });
    }

    const cars = await carsQuery.getMany();

    return cars;
  }

  async findById(car_id: string): Promise<Car> {
    const car = await this.ormRepository.findOne(car_id);
    return car;
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    await this.ormRepository
      .createQueryBuilder()
      .update()
      .set({ available })
      .where('id = :id')
      .setParameters({ id })
      .execute();
  }
}
