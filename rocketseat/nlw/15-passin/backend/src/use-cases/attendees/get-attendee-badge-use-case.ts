import { APIError } from '../../errors/api-error'
import { AttendeesRepository } from '../../repositories/attendees-repository'

export class GetAttendeeBadgeUseCase {
  constructor(private attendeesRepository: AttendeesRepository) {}

  async execute(id: number) {
    const attendee = await this.attendeesRepository.findById(id)

    if (!attendee) {
      throw new APIError(404, 'Attendee not found.')
    }

    return attendee
  }
}
