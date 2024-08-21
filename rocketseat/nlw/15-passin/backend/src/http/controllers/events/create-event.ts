import { FastifyReply, FastifyRequest } from 'fastify'
import z from 'zod'
import { makeCreateEventUseCase } from '../../../use-cases/events/factories/make-create-event-use-case'

export async function createEvent(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createEventSchema = z.object({
    title: z.string().min(4),
    details: z.string().nullable(),
    maximumAttendees: z.number().int().positive().nullable(),
  })

  const { title, details, maximumAttendees } = createEventSchema.parse(
    request.body,
  )

  const createEventUseCase = makeCreateEventUseCase()

  const { id } = await createEventUseCase.execute({
    details,
    slug: 'hello-world',
    title,
    maximumAttendees,
  })

  return reply.status(201).send({ eventId: id })
}
