import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeCreateActivityUseCase } from '../../../use-cases/activities/factories/make-create-activity-use-case'

export const createActivity: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/:tripId/activities',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(4),
          occursAt: z.coerce.date(),
        }),
        response: {
          201: z.object({
            activityId: z.string().uuid(),
          }),
        },
      },
    },
    async (request, reply) => {
      const { tripId } = request.params
      const { occursAt, title } = request.body

      const createActivityUseCase = makeCreateActivityUseCase()

      const activity = await createActivityUseCase.execute({
        occursAt,
        title,
        tripId,
      })

      return reply.status(201).send({ activityId: activity.id })
    },
  )
}
