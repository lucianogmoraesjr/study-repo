import { Specification } from '../infra/typeorm/entities/Specification';

export interface ISpecificationDTO {
  name: string;
  description: string;
}

export interface ISpecificationsRepository {
  create({ name, description }: ISpecificationDTO): Promise<Specification>;
  findByName(name: string): Promise<Specification> | undefined;
  findByIds(ids: string[]): Promise<Specification[]>;
}
