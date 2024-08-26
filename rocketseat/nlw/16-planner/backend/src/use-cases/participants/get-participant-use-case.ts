import { AppError } from '../../errors/app-error'
import { ParticipantsRepository } from '../../repositories/participants-repository'

export class GetParticipantUseCase {
  constructor(private participantsRepository: ParticipantsRepository) {}

  async execute(participantId: string) {
    const participant =
      await this.participantsRepository.findById(participantId)

    if (!participant) {
      throw new AppError(404, 'Participant not found.')
    }

    return participant
  }
}
