import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'
import { makeCreateLinkUseCase } from '../../../use-cases/links/factories/make-create-link-use-case'

export const createLink: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/:tripId/links',
    {
      schema: {
        params: z.object({
          tripId: z.string().uuid(),
        }),
        body: z.object({
          title: z.string().min(4),
          url: z.string().url(),
        }),
      },
    },
    async (request, reply) => {
      const { tripId } = request.params
      const { title, url } = request.body

      const createLinkUseCase = makeCreateLinkUseCase()

      const link = await createLinkUseCase.execute({
        title,
        tripId,
        url,
      })

      return reply.status(201).send({ linkId: link.id })
    },
  )
}
