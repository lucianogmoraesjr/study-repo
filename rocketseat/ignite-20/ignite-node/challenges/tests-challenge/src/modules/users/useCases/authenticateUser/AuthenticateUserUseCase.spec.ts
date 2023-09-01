import { IUsersRepository } from "../../repositories/IUsersRepository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let inMemoryUsersRepository: IUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
    authenticateUserUseCase = new AuthenticateUserUseCase(inMemoryUsersRepository)
  })

  it('should be able to authenticate an user', async () => {
    await createUserUseCase.execute({
      name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    const authResponse = await authenticateUserUseCase.execute({ email: 'john@mail.com', password: '123456'})

    expect(authResponse.token).toBeTruthy();
  });

  it('should not be able to authenticate an inexistent user', async () => {
    await expect(authenticateUserUseCase.execute({ email: 'john@mail.com', password: '123456'}))
    .rejects
    .toBeInstanceOf(IncorrectEmailOrPasswordError);
  });

  it('should not be able to authenticate an user with incorrect password', async () => {
    await createUserUseCase.execute({
      name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    await expect(authenticateUserUseCase.execute({ email: 'john@mail.com', password: '123'}))
    .rejects
    .toBeInstanceOf(IncorrectEmailOrPasswordError);
  });
});
