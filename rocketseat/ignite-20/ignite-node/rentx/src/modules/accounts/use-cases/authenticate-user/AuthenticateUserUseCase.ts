import { injectable, inject } from 'tsyringe';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';

import auth from '@config/auth';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
  };
  token: string;
  refresh_token: string;
}

@injectable()
export class AuthenticateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('DateProvider')
    private dateProvider: IDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('E-mail or password invalid');
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('E-mail or password invalid');
    }

    const token = sign({}, auth.token_secret, {
      subject: user.id,
      expiresIn: auth.token_expires_in,
    });

    const refresh_token = sign({ email }, auth.refresh_token_secret, {
      subject: user.id,
      expiresIn: auth.refresh_token_expires_in,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      auth.refresh_token_expires_days,
    );

    await this.usersTokensRepository.create({
      user_id: user.id,
      refresh_token,
      expires_date: refreshTokenExpiresDate,
    });

    const response: IResponse = {
      token,
      refresh_token,
      user: {
        name: user.name,
        email: user.email,
      },
    };

    return response;
  }
}
