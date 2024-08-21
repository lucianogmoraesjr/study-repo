import { FastifyInstance } from 'fastify'
import { createEvent } from './create-event'
import { fetchEvents } from './fetch-events'
import { getEvent } from './get-event'
import { getEventAttendees } from './get-event-attendees'

export async function eventsRoutes(app: FastifyInstance) {
  app.get('/events', fetchEvents)
  app.register(createEvent)
  app.register(getEvent)
  app.register(getEventAttendees)
}
