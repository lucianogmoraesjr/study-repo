import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetParticipantUseCase } from '../../../use-cases/participants/factories/make-get-participant-use-case'

export const getParticipant: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/participants/:participantId',
    {
      schema: {
        params: z.object({
          participantId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { participantId } = request.params

      const getParticipantUseCase = makeGetParticipantUseCase()

      const participant = await getParticipantUseCase.execute(participantId)

      return reply.send(participant)
    },
  )
}
