import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetActivitiesUseCase } from '../../../use-cases/activities/factories/make-get-activities-use-case'

export const getActivities: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:tripId/activities',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params

      const getActivitiesUseCase = makeGetActivitiesUseCase()

      const activities = await getActivitiesUseCase.execute(tripId)

      return reply.send({ activities })
    },
  )
}
