import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType, Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { CreateTransferError } from './CreateTransferError'

interface IRequest {
  sender_id: string;
  receiver_id: string;
  amount: number;
  description: string;
}

@injectable()
export class CreateTransferUseCase {
  constructor (
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StatementsRepository')
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({sender_id, receiver_id, amount, description }: IRequest): Promise<Statement> {
    const senderUser = await this.usersRepository.findById(sender_id);

    if (!senderUser) {
      throw new CreateTransferError.SenderUserNotFound();
    }

    const receiverUser = await this.usersRepository.findById(receiver_id);

    if (!receiverUser) {
      throw new CreateTransferError.ReceiverUserNotFound();
    }

    const { balance } = await this.statementsRepository.getUserBalance({ user_id: sender_id })

    if (balance < amount) {
      throw new CreateTransferError.InsufficientFunds();
    }

    const senderOperation = await this.statementsRepository.create({
      user_id: sender_id,
      sender_id,
      type: OperationType.TRANSFER,
      amount,
      description
    });

    const receiverOperation = await this.statementsRepository.create({
      user_id: receiver_id,
      sender_id,
      type: OperationType.TRANSFER,
      amount,
      description
    })

    return receiverOperation;
  }
}
