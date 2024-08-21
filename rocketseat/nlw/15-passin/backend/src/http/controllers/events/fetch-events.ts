import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchEventsUseCase } from '../../../use-cases/events/factories/make-fetch-events-use-case'

export async function fetchEvents(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchEventsUseCase = makeFetchEventsUseCase()

  const events = await fetchEventsUseCase.execute()

  return reply.send(events)
}
