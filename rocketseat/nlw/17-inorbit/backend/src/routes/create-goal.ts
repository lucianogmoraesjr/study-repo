import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoalUseCase } from '../use-cases/create-goal-use-case'

export const createGoal: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        body: z.object({
          title: z.string(),
          desiredWeeklyFrequency: z.number().int().min(1).max(7),
        }),
      },
    },
    async request => {
      const { desiredWeeklyFrequency, title } = request.body

      await createGoalUseCase({
        desiredWeeklyFrequency,
        title,
      })
    }
  )
}
