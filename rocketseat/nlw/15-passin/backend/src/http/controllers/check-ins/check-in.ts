import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeCheckInUseCase } from '../../../use-cases/check-ins/factories/make-check-in-use-case'

export const checkIn: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/attendees/:attendeeId/check-ins',
    {
      schema: {
        tags: ['check-ins'],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          201: z.null(),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const checkInUseCase = makeCheckInUseCase()

      await checkInUseCase.execute(attendeeId)

      return reply.status(201).send()
    },
  )
}
