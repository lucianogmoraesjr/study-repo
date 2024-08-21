import { EventsRepository } from '../../repositories/events-repository'

export interface CreateEventUseCaseRequest {
  slug: string
  title: string
  details: string | null
  maximumAttendees: number | null
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    details,
    slug,
    title,
    maximumAttendees,
  }: CreateEventUseCaseRequest) {
    const event = await this.eventsRepository.create({
      slug,
      title,
      details,
      maximumAttendees,
    })

    return event
  }
}
