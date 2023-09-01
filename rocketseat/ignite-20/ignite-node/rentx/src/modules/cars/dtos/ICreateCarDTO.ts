import { Specification } from '../infra/typeorm/entities/Specification';

export interface ICreateCarDTO {
  name: string;
  brand: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  category_id: string;
  specifications?: Specification[];
  id?: string;
}
