import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetAttendeeBadgeUseCase } from '../../../use-cases/attendees/factories/make-get-attendee-badge-use-case'

export const getAttendeeBadge: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {},
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const getAttendeeBadgeUseCase = makeGetAttendeeBadgeUseCase()

      const attendee = await getAttendeeBadgeUseCase.execute(attendeeId)

      return reply.send({ attendee })
    },
  )
}
