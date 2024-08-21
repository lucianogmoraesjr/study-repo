import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeRegisterForEventUseCase } from '../../../use-cases/attendees/factories/make-register-for-event-use-case'

export const registerForEvent: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/events/:eventId/attendees',
    {
      schema: {
        tags: ['attendees'],
        body: z.object({
          name: z.string().min(4),
          email: z.string().email(),
        }),
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          201: z.object({
            attendeeId: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params
      const { email, name } = request.body

      const registerForEventUseCase = makeRegisterForEventUseCase()

      const { id } = await registerForEventUseCase.execute({
        email,
        eventId,
        name,
      })

      return reply.status(201).send({ attendeeId: id })
    },
  )
}
