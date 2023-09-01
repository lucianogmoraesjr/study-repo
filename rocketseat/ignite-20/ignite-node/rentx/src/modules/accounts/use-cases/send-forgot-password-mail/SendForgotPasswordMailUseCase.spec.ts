import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IDateProvider } from '@shared/container/providers/DateProvider/IDateProvider';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepository';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { UsersRepostoriesInMemory } from '@modules/accounts/repositories/in-memory/UsersRepositoryInMemory';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { MailProviderInMemory } from '@shared/container/providers/MailProvider/in-memory/MailProviderInMemory';
import { SendForgotPasswordMailUseCase } from './SendForgotPasswordMailUseCase';
import { AppError } from '@shared/errors/AppError';

let usersRepositoryInMemory: IUsersRepository;
let usersTokensRepositoryInMemory: IUsersTokensRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;
let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;

describe('Send forgot mail', () => {
  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepostoriesInMemory();
    usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();
    mailProvider = new MailProviderInMemory();
    sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
      usersRepositoryInMemory,
      usersTokensRepositoryInMemory,
      dateProvider,
      mailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    await usersRepositoryInMemory.create({
      driver_license: '584946',
      email: 'ro@vockas.qa',
      name: 'Rosie Colon',
      password: '123456',
    });

    const sendMail = jest.spyOn(mailProvider, 'sendMail');

    await sendForgotPasswordMailUseCase.execute('ro@vockas.qa');

    expect(sendMail).toHaveBeenCalled();
  });

  it('should be able to send a forgot password mail if user does not exists', async () => {
    await expect(
      sendForgotPasswordMailUseCase.execute('numpima@cogpef.cm'),
    ).rejects.toEqual(new AppError('User not found.'));
  });

  it('should be able to create an user token', async () => {
    await usersRepositoryInMemory.create({
      driver_license: '584946',
      email: 'ro@vockas.qa',
      name: 'Rosie Colon',
      password: '123456',
    });

    const create = jest.spyOn(usersTokensRepositoryInMemory, 'create');

    await sendForgotPasswordMailUseCase.execute('ro@vockas.qa');

    expect(create).toHaveBeenCalled();
  });
});
