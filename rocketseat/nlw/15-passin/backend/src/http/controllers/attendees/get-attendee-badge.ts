import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetAttendeeBadgeUseCase } from '../../../use-cases/attendees/factories/make-get-attendee-badge-use-case'

export const getAttendeeBadge: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/attendees/:attendeeId/badge',
    {
      schema: {
        tags: ['attendees'],
        params: z.object({
          attendeeId: z.coerce.number().int(),
        }),
        response: {
          200: z.object({
            badge: z.object({
              name: z.string(),
              email: z.string().email(),
              eventTitle: z.string(),
              checkInURL: z.string().url(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const { attendeeId } = request.params

      const getAttendeeBadgeUseCase = makeGetAttendeeBadgeUseCase()

      const { email, name, event } =
        await getAttendeeBadgeUseCase.execute(attendeeId)

      const baseURL = `${request.protocol}://${request.hostname}`

      const checkInURL = new URL(
        `/attendees/${attendeeId}/check-in`,
        baseURL,
      ).toString()

      return reply.send({
        badge: {
          name,
          email,
          eventTitle: event.title,
          checkInURL,
        },
      })
    },
  )
}
