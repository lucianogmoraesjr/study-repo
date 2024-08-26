import { AppError } from '../../errors/app-error'
import { TripsRepository } from '../../repositories/trips-repository'

interface UpdateTripUseCaseRequest {
  id: string
  destination: string
  startsAt: Date
  endsAt: Date
}

export class UpdateTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute(data: UpdateTripUseCaseRequest) {
    const trip = await this.tripsRepository.findById(data.id)

    if (!trip) {
      throw new AppError(404, 'Trip not found.')
    }

    const updatedTrip = await this.tripsRepository.update(data)

    return updatedTrip
  }
}
