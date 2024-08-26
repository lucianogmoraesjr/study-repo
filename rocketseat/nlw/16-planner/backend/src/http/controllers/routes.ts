import { FastifyInstance } from 'fastify'
import { participantsRoutes } from './participants/routes'
import { tripsRoutes } from './trips/routes'

export async function routes(app: FastifyInstance) {
  app.register(tripsRoutes, { prefix: '/trips' })
  app.register(participantsRoutes)
}
