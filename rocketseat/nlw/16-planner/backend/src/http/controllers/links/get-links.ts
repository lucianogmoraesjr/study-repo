import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeGetLinksUseCase } from '../../../use-cases/links/factories/make-get-links-use-case'

export const getLinks: FastifyPluginAsyncZod = async (app) => {
  app.get(
    '/:tripId/links',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params

      const getLinksUseCase = makeGetLinksUseCase()

      const links = await getLinksUseCase.execute(tripId)

      return reply.send(links)
    },
  )
}
