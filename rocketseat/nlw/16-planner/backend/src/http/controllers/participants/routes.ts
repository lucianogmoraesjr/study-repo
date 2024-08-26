import { FastifyInstance } from 'fastify'
import { confirmParticipant } from './confirm-participant'
import { getParticipant } from './get-participant'
import { getParticipants } from './get-participants'
import { inviteParticipant } from './invite-participant'

export async function participantsRoutes(app: FastifyInstance) {
  app.register(confirmParticipant)
  app.register(getParticipants)
  app.register(inviteParticipant)
  app.register(getParticipant)
}
