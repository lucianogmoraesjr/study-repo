import { APIError } from '../../errors/api-error'
import { EventsRepository } from '../../repositories/events-repository'
import { generateSlug } from '../../utils/generate-slug'

export interface CreateEventUseCaseRequest {
  title: string
  details: string | null
  maximumAttendees: number | null
}

export class CreateEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute({
    details,
    title,
    maximumAttendees,
  }: CreateEventUseCaseRequest) {
    const slug = generateSlug(title)

    const eventWithSameSlug = await this.eventsRepository.findBySlug(slug)

    if (eventWithSameSlug) {
      throw new APIError(400, 'A event with same slug already exists.')
    }

    const event = await this.eventsRepository.create({
      slug,
      title,
      details,
      maximumAttendees,
    })

    return event
  }
}
