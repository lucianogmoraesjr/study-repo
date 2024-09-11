import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekPendingGoalsUseCase } from '../use-cases/get-week-pending-goals-use-case'

export const getWeekPendingGoals: FastifyPluginAsyncZod = async app => {
  app.get('/pending-goals', async (_, reply) => {
    const pendingGoals = await getWeekPendingGoalsUseCase()

    return reply.send(pendingGoals)
  })
}
