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
    const [attendees, totalAttendees] = await Promise.all([
      this.attendeesRepository.findAllByEvent({
        eventId,
        pageIndex,
        query,
      }),
      this.attendeesRepository.countAttendeesForEvent(eventId),
    ])

    return { attendees, total: totalAttendees }
  }
}
