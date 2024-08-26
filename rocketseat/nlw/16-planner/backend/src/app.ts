import fastifyCors from '@fastify/cors'
import fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'
import { ZodError } from 'zod'
import { AppError } from './errors/app-error'
import { routes } from './http/controllers/routes'

export const app = fastify()

app.register(fastifyCors, {
  origin: '*',
})

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.register(routes)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof AppError) {
    return reply.status(error.status).send({ message: error.message })
  }

  if (error instanceof ZodError) {
    return reply.status(400).send({ message: error.flatten().fieldErrors })
  }

  console.log(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
