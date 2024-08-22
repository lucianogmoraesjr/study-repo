import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeFetchEventAttendeesUseCase } from '../../../use-cases/attendees/factories/make-fetch-event-attendees-use-case'

export const getEventAttendees: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/events/:eventId/attendees',
    {
      schema: {
        tags: ['events'],
        params: z.object({
          eventId: z.string().uuid(),
        }),
        querystring: z.object({
          query: z.string().optional(),
          pageIndex: z.string().nullish().default('0').transform(Number),
        }),
        response: {
          200: z.object({
            attendees: z.array(
              z.object({
                id: z.number().int(),
                name: z.string(),
                email: z.string().email(),
                createdAt: z.date(),
                checkedInAt: z.date().nullable(),
              }),
            ),
            total: z.number(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { eventId } = request.params
      const { pageIndex, query } = request.query

      const fetchEventAttendeesUseCase = makeFetchEventAttendeesUseCase()

      const { attendees, total } = await fetchEventAttendeesUseCase.execute({
        eventId,
        pageIndex,
        query,
      })

      return reply.status(200).send({
        attendees: attendees.map((attendee) => ({
          id: attendee.id,
          name: attendee.name,
          email: attendee.email,
          createdAt: attendee.createdAt,
          checkedInAt: attendee.checkIn?.createdAt ?? null,
        })),
        total,
      })
    },
  )
}
