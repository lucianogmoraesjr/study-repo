import { AppError } from '../../errors/app-error'
import { TripsRepository } from '../../repositories/trips-repository'

export class GetTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute(tripId: string) {
    const trip = await this.tripsRepository.findById(tripId)

    if (!trip) {
      throw new AppError(404, 'Trip not found.')
    }

    return trip
  }
}
