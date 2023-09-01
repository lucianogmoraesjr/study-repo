import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateTransferUseCase } from "./CreateTransferUseCase";

export class CreateTranserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { user_id } = request.params;
    const { amount, description } = request.body;

    const createTransferUseCase = container.resolve(CreateTransferUseCase);

    const transfer = await createTransferUseCase.execute({
      sender_id: id,
      receiver_id: user_id,
      amount,
      description
    });

    return response.status(201).json(transfer);
  }
}
