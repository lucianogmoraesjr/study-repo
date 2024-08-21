import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeCreateEventUseCase } from '../../../use-cases/events/factories/make-create-event-use-case'

const createEventBodySchema = z.object({
  title: z.string().min(4),
  details: z.string().nullable(),
  maximumAttendees: z.number().int().positive().nullable(),
})

const createEventResponseSchema = {
  201: z.object({
    eventId: z.string().uuid(),
  }),
}

export const createEvent: FastifyPluginAsyncZod = async function (app) {
  app.post(
    '/events',
    {
      schema: {
        body: createEventBodySchema,
        response: createEventResponseSchema,
      },
    },
    async (request, reply) => {
      const { title, details, maximumAttendees } = request.body

      const createEventUseCase = makeCreateEventUseCase()

      const { id } = await createEventUseCase.execute({
        details,
        title,
        maximumAttendees,
      })

      return reply.status(201).send({ eventId: id })
    },
  )
}
