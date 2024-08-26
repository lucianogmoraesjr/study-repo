import { z } from 'zod'

import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { makeUpdateTripUseCase } from '../../../use-cases/trips/factories/make-update-trip-use-case'

export const updateTrip: FastifyPluginAsyncZod = async (app) => {
  app.put(
    '/:tripId',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          destination: z.string().min(4),
          startsAt: z.coerce.date(),
          endsAt: z.coerce.date(),
        }),
        response: {
          201: z.object({
            tripId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params
      const { destination, endsAt, startsAt } = request.body

      const updateTripUseCase = makeUpdateTripUseCase()

      const trip = await updateTripUseCase.execute({
        id: tripId,
        destination,
        endsAt,
        startsAt,
      })

      return reply.status(201).send({ tripId: trip.id })
    },
  )
}
