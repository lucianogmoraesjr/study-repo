import { IUsersRepository } from "../../repositories/IUsersRepository";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase"
import { CreateUserError } from "./CreateUserError";

let inMemoryUsersRepository: IUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe('Create User Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository)
  });

  it('should be able to create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'user-test',
      email: 'user@test.com',
      password: '123456'
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user if e-mail already exists', async () => {
    await createUserUseCase.execute({
      name: 'user-test',
      email: 'user@test.com',
      password: '123456'
    });

    await expect(createUserUseCase.execute({
      name: 'user-test',
      email: 'user@test.com',
      password: '123456'
    })).rejects.toBeInstanceOf(CreateUserError);
  });
});
