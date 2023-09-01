import { Repository, getRepository } from 'typeorm';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
    id,
    avatar,
  }: ICreateUserDTO): Promise<void> {
    const user = this.ormRepository.create({
      name,
      email,
      driver_license,
      password,
      id,
      avatar,
    });

    await this.ormRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.ormRepository.findOne({ email });
    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.ormRepository.findOne(id);
    return user;
  }
}
