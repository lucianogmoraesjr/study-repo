import { FastifyInstance } from 'fastify'
import { getAttendeeBadge } from './get-attendee-badge'
import { registerForEvent } from './register-for-event'

export async function attendeesRoutes(app: FastifyInstance) {
  app.register(registerForEvent)
  app.register(getAttendeeBadge)
}
