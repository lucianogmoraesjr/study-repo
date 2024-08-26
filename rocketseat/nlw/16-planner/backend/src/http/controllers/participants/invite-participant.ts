import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeInviteParticipantUseCase } from '../../../use-cases/participants/factories/make-invite-participant-use-case'

export const inviteParticipant: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/trips/:tripId/invite',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          email: z.string().email(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params
      const { email } = request.body

      const inviteParticipantUseCase = makeInviteParticipantUseCase()

      const participant = await inviteParticipantUseCase.execute({
        tripId,
        email,
      })

      return reply.status(201).send({ participantId: participant.id })
    },
  )
}
