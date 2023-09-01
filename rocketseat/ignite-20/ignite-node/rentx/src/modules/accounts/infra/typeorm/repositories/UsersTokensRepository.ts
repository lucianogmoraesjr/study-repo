import { Repository, getRepository } from 'typeorm';
import { ICreateUserTokenDTO } from '@modules/accounts/dtos/ICreateUserTokenDTO';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UserTokens } from '../entities/UserTokens';

export class UsersTokensRepository implements IUsersTokensRepository {
  private ormRepository: Repository<UserTokens>;

  constructor() {
    this.ormRepository = getRepository(UserTokens);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = this.ormRepository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    user_id: string,
    refresh_token: string,
  ): Promise<UserTokens> {
    return await this.ormRepository.findOne({ user_id, refresh_token });
  }

  async deleteById(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return await this.ormRepository.findOne({ refresh_token });
  }
}
