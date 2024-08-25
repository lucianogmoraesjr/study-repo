import { AppError } from '../../errors/app-error'
import { ParticipantsRepository } from '../../repositories/participants-repository'

export class ConfirmParticipantUseCase {
  constructor(
    private participantsRepository: ParticipantsRepository,
    private redirectFn: (url: string) => void,
  ) {}

  async execute(participantId: string) {
    const participant =
      await this.participantsRepository.findById(participantId)

    if (!participant) {
      throw new AppError(404, 'Participant not found.')
    }

    if (participant.isConfirmed) {
      return this.redirectFn(
        `http://localhost:3000/trips/${participant.tripId}`,
      )
    }

    await this.participantsRepository.update({
      id: participantId,
      isConfirmed: true,
    })

    return this.redirectFn(`http://localhost:3000/trips/${participant.tripId}`)
  }
}
