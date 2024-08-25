import { z } from 'zod'

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { makeCreateTripUseCase } from '../../../use-cases/trips/factories/make-create-trip-use-case'

export const createTrip: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/',
    {
      schema: {
        body: z.object({
          destination: z.string().min(4),
          startsAt: z.coerce.date(),
          endsAt: z.coerce.date(),
          ownerName: z.string(),
          ownerEmail: z.string().email(),
          emailsToInvite: z.array(z.string().email()),
        }),
        response: {
          201: z.object({
            tripId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const {
        destination,
        endsAt,
        startsAt,
        ownerEmail,
        ownerName,
        emailsToInvite,
      } = request.body

      const createTripUseCase = makeCreateTripUseCase()

      const trip = await createTripUseCase.execute({
        destination,
        endsAt,
        startsAt,
        ownerEmail,
        ownerName,
        emailsToInvite,
      })

      return reply.status(201).send({ tripId: trip.id })
    },
  )
}
