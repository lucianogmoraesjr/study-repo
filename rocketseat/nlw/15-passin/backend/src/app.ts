import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { attendeesRoutes } from './http/controllers/attendees/routes'
import { eventsRoutes } from './http/controllers/events/routes'

export const app = fastify()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(eventsRoutes)
app.register(attendeesRoutes)

app.setErrorHandler((error, _, reply) => {
  console.log(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
