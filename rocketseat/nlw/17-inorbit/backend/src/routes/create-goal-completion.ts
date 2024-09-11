import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { createGoalCompletionUseCase } from '../use-cases/create-goal-completion-use-case'

export const createGoalCompletion: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body

      await createGoalCompletionUseCase({ goalId })
    }
  )
}
