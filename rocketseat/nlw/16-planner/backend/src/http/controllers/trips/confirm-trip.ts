import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeConfirmTripUseCase } from '../../../use-cases/trips/factories/make-confirm-trip-use-case'

export const confirmTrip: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:tripId/confirm',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params

      const confirmTripUseCase = makeConfirmTripUseCase(
        reply.redirect.bind(reply),
      )

      await confirmTripUseCase.execute(tripId)
    },
  )
}
