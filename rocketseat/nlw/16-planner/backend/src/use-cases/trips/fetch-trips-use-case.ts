import { TripsRepository } from '../../repositories/trips-repository'

export class FetchTripsUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute() {
    const trips = await this.tripsRepository.findAll()

    return trips
  }
}
