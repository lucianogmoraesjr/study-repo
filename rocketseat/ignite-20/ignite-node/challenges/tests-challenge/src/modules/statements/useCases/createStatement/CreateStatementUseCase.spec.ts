import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryUsersRepository: IUsersRepository;
let inMemoryStatementsRepository: IStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;

describe('Create Statement Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    )
  });

  it('should be able to create an user statement', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    const response = await createStatementUseCase.execute({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: 'Description 1'
    })

    expect(response).toHaveProperty('id');
    expect(response.amount).toBe(1000);
  });

  it('should be able to create a statement if user not exists', async () => {
    await expect(createStatementUseCase.execute({
      user_id: 'inexistent-user',
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: 'Description 1'
    })).rejects.toBeInstanceOf(CreateStatementError.UserNotFound);
  });

  it('should not be able to create a statement if user balance is invalid', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    await expect(createStatementUseCase.execute({
      user_id: user.id as string,
      type: OperationType.WITHDRAW,
      amount: 1000,
      description: 'Description 1'
    })).rejects.toBeInstanceOf(CreateStatementError.InsufficientFunds);
  });
});
