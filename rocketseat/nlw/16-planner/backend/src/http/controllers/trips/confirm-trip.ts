import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const confirmTrip: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:tripId/confirm',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        response: {
          200: z.object({
            tripId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params

      return reply.send({ tripId })
    },
  )
}
