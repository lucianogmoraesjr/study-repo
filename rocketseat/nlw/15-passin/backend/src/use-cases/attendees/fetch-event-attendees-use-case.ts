import { AttendeesRepository } from '../../repositories/attendees-repository'

interface FetchEventAttendeesUseCaseRequest {
  eventId: string
  pageIndex: number
  query?: string
}

export class FetchEventAttendeesUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute({
    eventId,
    pageIndex = 0,
    query,
  }: FetchEventAttendeesUseCaseRequest) {
    const attendees = await this.attendeesRepository.findAllByEvent({
      eventId,
      pageIndex,
      query,
    })

    return attendees
  }
}
