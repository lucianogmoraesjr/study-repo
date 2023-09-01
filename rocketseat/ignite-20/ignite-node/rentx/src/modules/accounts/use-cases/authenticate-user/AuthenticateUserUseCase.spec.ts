import { AppError } from '@shared/errors/AppError';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { UsersRepostoriesInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserUseCase } from '../create-user/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';

let usersRepositoryInMemory: IUsersRepository;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let dateProvider: IDateProvider;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepostoriesInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
    );
  });

  it('should be able to authenticate an user', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
      driver_license: '123456',
    };

    await createUserUseCase.execute(user);

    const { token } = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(token).toBeTruthy();
  });

  it('should not be able to authenticate an invalid user', async () => {
    await expect(
      authenticateUserUseCase.execute({
        email: 'invalid@mail.com',
        password: '123456',
      }),
    ).rejects.toEqual(new AppError('E-mail or password invalid'));
  });

  it('should not be able to authenticate an user with invalid password', async () => {
    const user = {
      name: 'John Doe',
      email: 'john@mail.com',
      password: '123456',
      driver_license: '123456',
    };

    await createUserUseCase.execute(user);

    await expect(
      authenticateUserUseCase.execute({
        email: user.email,
        password: 'invalid-password',
      }),
    ).rejects.toEqual(new AppError('E-mail or password invalid'));
  });
});
