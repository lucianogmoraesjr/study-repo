import { FastifyInstance } from 'fastify'
import { checkIn } from './check-in'

export async function checkInsRoutes(app: FastifyInstance) {
  app.register(checkIn)
}
