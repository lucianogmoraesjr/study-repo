import { Request, Response } from 'express'
import { UserProfileService } from '../services/UserProfileService'

export class UserProfileController {
  async handle(req: Request, res: Response) {
    const { user_id } = req

    const service = new UserProfileService()

    const result = await service.execute(user_id)

    res.json(result)
  }
}
