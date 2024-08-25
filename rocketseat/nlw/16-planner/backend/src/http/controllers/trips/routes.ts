import { FastifyInstance } from 'fastify'
import { activitiesRoutes } from '../activities/routes'
import { linksRoutes } from '../links/routes'
import { confirmTrip } from './confirm-trip'
import { createTrip } from './create-trip'
import { fetchTrips } from './fetch-trips'
import { getTrip } from './get-trip'

export async function tripsRoutes(app: FastifyInstance) {
  app.get('/trips', fetchTrips)
  app.register(getTrip)
  app.register(createTrip)
  app.register(confirmTrip)
  app.register(activitiesRoutes)
  app.register(linksRoutes)
}
