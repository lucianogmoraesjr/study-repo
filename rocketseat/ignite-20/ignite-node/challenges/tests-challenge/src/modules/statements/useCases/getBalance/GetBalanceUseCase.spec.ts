import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType } from "../../entities/Statement";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateStatementUseCase } from "../createStatement/CreateStatementUseCase";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let inMemoryStatementsRepository: IStatementsRepository;
let inMemoryUsersRepository: IUsersRepository;
let createStatementUseCase: CreateStatementUseCase;
let getBalanceUseCase: GetBalanceUseCase;

describe('Get Balance Use Case', () => {
  beforeEach(() => {
    inMemoryStatementsRepository = new InMemoryStatementsRepository()
    inMemoryUsersRepository = new InMemoryUsersRepository()
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it('should be able to get an user balance', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    await Promise.all([
      createStatementUseCase.execute({
        user_id: user.id as string,
        type: OperationType.DEPOSIT,
        amount: 1000,
        description: 'Description 1'
      }),
      createStatementUseCase.execute({
        user_id: user.id as string,
        type: OperationType.WITHDRAW,
        amount: 500,
        description: 'Description 2'
      }),
      createStatementUseCase.execute({
        user_id: user.id as string,
        type: OperationType.DEPOSIT,
        amount: 200,
        description: 'Description 3'
      })
    ]);

    const response = await getBalanceUseCase.execute({ user_id: user.id as string });

    expect(response).toHaveProperty('balance');
    expect(response.balance).toBe(700);
  });

  it('should not be able to get a balance of an inexistent user', async () => {
    await expect(getBalanceUseCase.execute({ user_id: 'inexistent-id' }))
    .rejects
    .toBeInstanceOf(GetBalanceError)
  });
});
