import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetEventUseCase } from '../../../use-cases/events/factories/make-get-event-use-case'

export const getEvent: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/events/:eventId',
    {
      schema: {
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            event: z.object({
              id: z.string().uuid(),
              title: z.string(),
              slug: z.string(),
              details: z.string().nullable(),
              maximumAttendees: z.number().int().nullable(),
              attendeesAmount: z.number().int(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params

      const getEventUseCase = makeGetEventUseCase()

      const event = await getEventUseCase.execute(eventId)

      return reply.send({
        event: {
          id: event.id,
          title: event.title,
          slug: event.slug,
          details: event.details,
          maximumAttendees: event.maximumAttendees,
          attendeesAmount: event._count.attendees,
        },
      })
    },
  )
}
