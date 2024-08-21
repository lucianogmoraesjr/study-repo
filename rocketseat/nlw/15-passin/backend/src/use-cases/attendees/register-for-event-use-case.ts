import { AttendeesRepository } from '../../repositories/attendees-repository'
import { EventsRepository } from '../../repositories/events-repository'

export interface RegisterForEventUseCaseRequest {
  name: string
  email: string
  eventId: string
}

export class RegisterForEventUseCase {
  constructor(
    private attendeesRepository: AttendeesRepository,
    private eventsRepository: EventsRepository,
  ) {}

  async execute({ email, eventId, name }: RegisterForEventUseCaseRequest) {
    const attendeeFromEmail =
      await this.attendeesRepository.findByEmailAndEventId({
        email,
        eventId,
      })

    if (attendeeFromEmail) {
      throw new Error('This e-mail is already registered for this event.')
    }

    const [event, amountOfAttendeesForEvent] = await Promise.all([
      this.eventsRepository.findById(eventId),
      this.attendeesRepository.countAttendeesForEvent(eventId),
    ])

    if (
      event?.maximumAttendees &&
      amountOfAttendeesForEvent >= event.maximumAttendees
    ) {
      throw new Error(
        'The maximum number of attendees for this event been reached.',
      )
    }

    const attendee = await this.attendeesRepository.create({
      email,
      eventId,
      name,
    })

    return attendee
  }
}
