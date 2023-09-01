import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { ShowProfileUseCase } from './ShowProfileUseCase';

export class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showProfileUseCase = container.resolve(ShowProfileUseCase);

    const user = await showProfileUseCase.execute(id);

    return response.json(user);
  }
}
