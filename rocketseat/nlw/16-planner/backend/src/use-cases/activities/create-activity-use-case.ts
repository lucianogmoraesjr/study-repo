import { AppError } from '../../errors/app-error'
import { dayjs } from '../../lib/dayjs'
import { ActivitiesRepository } from '../../repositories/activities-repository'
import { TripsRepository } from '../../repositories/trips-repository'

interface CreateActivityUseCaseRequest {
  title: string
  occursAt: Date
  tripId: string
}

export class CreateActivityUseCase {
  constructor(
    private activitiesRepository: ActivitiesRepository,
    private tripsRepository: TripsRepository,
  ) {}

  async execute({ occursAt, title, tripId }: CreateActivityUseCaseRequest) {
    const trip = await this.tripsRepository.findById(tripId)

    if (!trip) {
      throw new AppError(404, 'Trip not found.')
    }

    if (dayjs(occursAt).isBefore(trip.startsAt)) {
      throw new AppError(400, 'Invalid activity date.')
    }

    if (dayjs(occursAt).isAfter(trip.endsAt)) {
      throw new AppError(400, 'Invalid activity date.')
    }

    const activity = await this.activitiesRepository.create({
      occursAt,
      title,
      tripId,
    })

    return activity
  }
}
