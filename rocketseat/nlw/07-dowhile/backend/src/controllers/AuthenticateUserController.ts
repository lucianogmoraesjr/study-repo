import { Request, Response } from 'express'
import { AuthenticateUserService } from '../services/AuthenticateUserService'

export class AuthenticateUserController {
  async handle(req: Request, res: Response) {
    const { code } = req.body

    const service = new AuthenticateUserService()

    try {
      const result = await service.execute(code)
      return res.json(result)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }
}
