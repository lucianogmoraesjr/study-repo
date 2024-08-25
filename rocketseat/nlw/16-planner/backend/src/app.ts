import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { routes } from './http/controllers/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  console.log(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
