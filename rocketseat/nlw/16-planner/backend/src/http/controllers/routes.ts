import { FastifyInstance } from 'fastify'
import { tripsRoutes } from './trips/routes'

export async function routes(app: FastifyInstance) {
  app.register(tripsRoutes, { prefix: '/trips' })
}
