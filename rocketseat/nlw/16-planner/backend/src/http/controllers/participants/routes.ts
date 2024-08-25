import { FastifyInstance } from 'fastify'
import { confirmParticipant } from './confirm-participant'

export async function participantsRoutes(app: FastifyInstance) {
  app.register(confirmParticipant)
}
