import { Request, Response } from 'express'
import { GetLastThreeMessagesService } from '../services/GetLastThreeMessagesService'

export class GetLastThreeMessagesController {
  async handle(req: Request, res: Response) {
    const service = new GetLastThreeMessagesService()

    const result = await service.execute()

    res.json(result)
  }
}
