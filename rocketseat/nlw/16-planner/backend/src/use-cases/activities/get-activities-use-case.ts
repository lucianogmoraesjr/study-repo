import { AppError } from '../../errors/app-error'
import { dayjs } from '../../lib/dayjs'
import { TripsRepository } from '../../repositories/trips-repository'

export class GetActivitiesUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute(tripId: string) {
    const trip = await this.tripsRepository.findTripActivities(tripId)

    if (!trip) {
      throw new AppError(404, 'Trip not found.')
    }

    const differenceInDaysBetweenTripStartAndEnd = dayjs(trip.endsAt).diff(
      trip.startsAt,
      'days',
    )

    const activities = Array.from({
      length: differenceInDaysBetweenTripStartAndEnd + 1,
    }).map((_, index) => {
      const date = dayjs(trip.startsAt).add(index, 'days')

      return {
        date: date.toDate(),
        activities: trip.activities.filter((activity) =>
          dayjs(activity.occursAt).isSame(date, 'day'),
        ),
      }
    })

    return activities
  }
}
