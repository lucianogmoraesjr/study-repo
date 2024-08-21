import fastify from 'fastify'
import z from 'zod'
import { prismaClient } from './lib/prisma-client'

const app = fastify()

app.post('/events', async (request, reply) => {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  })

  const { title, details, maximumAttendees } = createEventSchema.parse(
    request.body,
  )

  const { id } = await prismaClient.event.create({
    data: {
      title,
      details,
      maximumAttendees,
      slug: 'hello-world',
    },
  })

  return reply.status(201).send({ eventId: id })
})

app.get('/events', async (request, reply) => {
  const events = await prismaClient.event.findMany()

  return reply.send(events)
})

app
  .listen({ port: 3333, host: '0.0.0.0' })
  .then(() => console.log('🔥 server running on http://localhost:3333'))
