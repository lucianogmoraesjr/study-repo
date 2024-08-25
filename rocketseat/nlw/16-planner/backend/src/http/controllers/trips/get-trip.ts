import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetTripUseCase } from '../../../use-cases/trips/factories/make-get-trip-use-case'

export const getTrip: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:tripId',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params

      const getTripUseCase = makeGetTripUseCase()

      const trip = await getTripUseCase.execute(tripId)

      return reply.send({ trip })
    },
  )
}
