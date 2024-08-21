import { APIError } from '../../errors/api-error'
import { EventsRepository } from '../../repositories/events-repository'

export class GetEventUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute(eventId: string) {
    const event = await this.eventsRepository.findById(eventId)

    if (!event) {
      throw new APIError(404, 'Event not found.')
    }

    return event
  }
}
