import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeConfirmParticipantUseCase } from '../../../use-cases/participants/factories/make-confirm-participant-use-case'

export const confirmParticipant: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:participantId/confirm',
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params

      const confirmParticipantUseCase = makeConfirmParticipantUseCase(
        reply.redirect.bind(reply),
      )

      await confirmParticipantUseCase.execute(participantId)
    },
  )
}
