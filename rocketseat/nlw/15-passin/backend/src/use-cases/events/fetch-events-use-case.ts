import { EventsRepository } from '../../repositories/events-repository'

export class FetchEventsUseCase {
  constructor(private eventsRepository: EventsRepository) {}

  async execute() {
    const events = await this.eventsRepository.findAll()

    return events
  }
}
