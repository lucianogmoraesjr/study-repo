import { FastifyInstance } from 'fastify'
import { createActivity } from './create-activity'
import { getActivities } from './get-activities'

export async function activitiesRoutes(app: FastifyInstance) {
  app.register(createActivity)
  app.register(getActivities)
}
