import { FastifyReply, FastifyRequest } from 'fastify'
import { makeFetchTripsUseCase } from '../../../use-cases/trips/factories/make-fetch-trips-use-case'

export async function fetchTrips(request: FastifyRequest, reply: FastifyReply) {
  const fetchTripsUseCase = makeFetchTripsUseCase()

  const trips = await fetchTripsUseCase.execute()

  return reply.send({ trips })
}
