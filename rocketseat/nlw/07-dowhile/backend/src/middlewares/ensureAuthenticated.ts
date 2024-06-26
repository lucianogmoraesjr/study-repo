import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'

interface Paylod {
  sub: string
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authToken = req.headers.authorization

  if (!authToken) {
    return res.status(401).json({
      errorCode: 'token.invalid',
    })
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, process.env.JWT_SECRET) as Paylod

    req.user_id = sub

    return next()
  } catch (error) {
    return res.status(401).json({
      errorCode: 'token.expired',
    })
  }
}
