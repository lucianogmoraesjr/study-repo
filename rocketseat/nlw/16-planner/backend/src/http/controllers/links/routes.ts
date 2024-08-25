import { FastifyInstance } from 'fastify'
import { createLink } from './create-link'
import { getLinks } from './get-links'

export async function linksRoutes(app: FastifyInstance) {
  app.register(createLink)
  app.register(getLinks)
}
