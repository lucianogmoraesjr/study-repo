import { ICreateCarDTO } from '@modules/cars/dtos/ICreateCarDTO';
import { ICarsRepository } from '../ICarsRepository';
import { Car } from '@modules/cars/infra/typeorm/entities/Car';

export class CarsRepositoryInMemory implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    brand,
    description,
    daily_rate,
    fine_amount,
    license_plate,
    category_id,
    specifications,
    id,
  }: ICreateCarDTO): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      brand,
      description,
      daily_rate,
      fine_amount,
      license_plate,
      category_id,
      specifications,
      id,
    });

    this.cars.push(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return this.cars.find(car => car.license_plate === license_plate);
  }

  async findAvailable(
    category_id?: string,
    brand?: string,
    name?: string,
  ): Promise<Car[]> {
    let availableCars = this.cars.filter(car => car.available === true);

    if (!name && !brand && !category_id) return availableCars;

    availableCars = availableCars.filter(car => {
      if (car.name === name) return true;
      if (car.brand === brand) return true;
      if (car.category_id === category_id) return true;

      return false;
    });

    return availableCars;
  }

  async findById(car_id: string): Promise<Car> {
    return this.cars.find(car => car.id === car_id);
  }

  async updateAvailable(id: string, available: boolean): Promise<void> {
    const carIndex = this.cars.findIndex(car => car.id === id);

    this.cars[carIndex].available = available;
  }
}
