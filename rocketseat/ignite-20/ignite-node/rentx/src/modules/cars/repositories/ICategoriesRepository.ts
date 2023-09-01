import { Category } from '../infra/typeorm/entities/Category';

export interface ICategoryDTO {
  name: string;
  description: string;
}

export interface ICategoriesRepositories {
  create({ name, description }: ICategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  findByName(name: string): Promise<Category> | undefined;
}
