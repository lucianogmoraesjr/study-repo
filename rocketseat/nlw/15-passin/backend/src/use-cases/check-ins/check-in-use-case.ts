import { APIError } from '../../errors/api-error'
import { CheckInsRepository } from '../../repositories/check-ins-repository'

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute(attendeeId: number) {
    const attendeeCheckIn =
      await this.checkInsRepository.findByAttendee(attendeeId)

    if (attendeeCheckIn) {
      throw new APIError(400, 'Attendee already check-in.')
    }

    await this.checkInsRepository.create({ attendeeId })
  }
}
