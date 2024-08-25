import { AppError } from '../../errors/app-error'
import { LinksRepository } from '../../repositories/links-repository'
import { TripsRepository } from '../../repositories/trips-repository'

interface CreateLinkUseCaseRequest {
  title: string
  url: string
  tripId: string
}

export class CreateLinkUseCase {
  constructor(
    private linksRepository: LinksRepository,
    private tripsRepository: TripsRepository,
  ) {}

  async execute(data: CreateLinkUseCaseRequest) {
    const trip = await this.tripsRepository.findById(data.tripId)

    if (!trip) {
      throw new AppError(404, 'Trip not found.')
    }

    const link = await this.linksRepository.create(data)

    return link
  }
}
