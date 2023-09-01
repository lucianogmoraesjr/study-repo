import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { GetStatementOperationUseCase } from "./GetStatementOperationUseCase";
import { OperationType } from "../../entities/Statement";
import { GetStatementOperationError } from "./GetStatementOperationError";

let inMemoryUsersRepository: IUsersRepository;
let inMemoryStatementsRepository: IStatementsRepository;
let getStatementOperationUseCase: GetStatementOperationUseCase;

describe('Get Statement Operation Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    getStatementOperationUseCase = new GetStatementOperationUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it('should be able to get statement operation from an user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    const statement = await inMemoryStatementsRepository.create({
      user_id: user.id as string,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: 'Description 1'
    })

    const response = await getStatementOperationUseCase.execute({
      user_id:user.id as string,
      statement_id: statement.id as string,
    })

    expect(response.id).toBe(statement.id);
    expect(response.user_id).toBe(user.id);
    expect(response).toEqual(statement);
  });

  it('should not be able to get statement operation from an inexistent user', async () => {
    await expect(getStatementOperationUseCase.execute({
      user_id: 'inexistent-user',
      statement_id: 'some-statement-id',
    })).rejects.toBeInstanceOf(GetStatementOperationError.UserNotFound)
  });

  it('should not be able to get an inexistent statement operation from an user', async () => {
    const user = await inMemoryUsersRepository.create({
      name: 'John',
      email: 'john@mail.com',
      password: '123456'
    });

    await expect(getStatementOperationUseCase.execute({
      user_id: user.id as string,
      statement_id: 'inexistent-statement',
    })).rejects.toBeInstanceOf(GetStatementOperationError.StatementNotFound);
  });
});
