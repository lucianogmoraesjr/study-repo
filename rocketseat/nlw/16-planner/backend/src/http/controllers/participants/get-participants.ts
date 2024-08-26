import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetParticipantsUseCase } from '../../../use-cases/participants/factories/make-get-participants-use-case'

export const getParticipants: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/trips/:tripId/participants',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params

      const getParticipantsUseCase = makeGetParticipantsUseCase()

      const participants = await getParticipantsUseCase.execute(tripId)

      return reply.send(participants)
    },
  )
}
