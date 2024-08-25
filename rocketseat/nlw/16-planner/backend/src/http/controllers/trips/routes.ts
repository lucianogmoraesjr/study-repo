import { FastifyInstance } from 'fastify'
import { confirmTrip } from './confirm-trip'
import { createTrip } from './create-trip'
import { fetchTrips } from './fetch-trips'

export async function tripsRoutes(app: FastifyInstance) {
  app.get('/trips', fetchTrips)
  app.register(createTrip)
  app.register(confirmTrip)
}
