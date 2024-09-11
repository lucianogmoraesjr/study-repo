import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { getWeekSummaryUseCase } from '../../use-cases/get-week-summary-use-case'

export const getWeekSummary: FastifyPluginAsyncZod = async app => {
  app.get('/summary', async (_, reply) => {
    const summary = await getWeekSummaryUseCase()

    return reply.send(summary)
  })
}
