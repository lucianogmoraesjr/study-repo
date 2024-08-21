import { FastifyInstance } from 'fastify'
import { createEvent } from './create-event'
import { fetchEvents } from './fetch-events'

export async function eventsRoutes(app: FastifyInstance) {
  app.get('/events', fetchEvents)
  app.post('/events', createEvent)
}
