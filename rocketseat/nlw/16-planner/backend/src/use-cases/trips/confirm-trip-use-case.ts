import nodemailer from 'nodemailer'

import { AppError } from '../../errors/app-error'
import { dayjs } from '../../lib/dayjs'
import { getMailClient } from '../../lib/mail'
import { TripsRepository } from '../../repositories/trips-repository'

export class ConfirmTripUseCase {
  constructor(
    private tripsRepository: TripsRepository,
    private redirectFn: (url: string) => void,
  ) {}

  async execute(tripId: string) {
    const trip = await this.tripsRepository.findById(tripId)

    if (!trip) {
      throw new AppError(404, 'Trip not found.')
    }

    if (trip.isConfirmed) {
      this.redirectFn(`http://localhost:3000/trips/${tripId}`)
    }

    await this.tripsRepository.update({
      id: tripId,
      isConfirmed: true,
    })

    const startsAtDay = dayjs(trip.startsAt).get('D')
    const formattedEndsAt = dayjs(trip.endsAt).format('LL')

    const mail = await getMailClient()

    await Promise.all(
      trip.participants.map(async (participant) => {
        const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`

        const message = await mail.sendMail({
          from: {
            name: 'Equipe plann.er',
            address: 'oi@planner.com',
          },
          to: participant.email,
          subject: `Confirme sua presença na viagem para ${trip.destination}`,
          html: `
        <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
          <p>Você foi convidado(a) para participar de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${startsAtDay} à ${formattedEndsAt}.</strong></p>
          <p>Para confirmar sua presença na viagem, clique no link abaixo:</p>
          <p>
            <a href="${confirmationLink}">Confirmar presença</a>
          </p>
          <p>Caso esteja usando o dispositivo móvel, você também pode confirmar a criação da viagem pelos aplicativos:</p>
          <a href="">Aplicativo para iPhone</a><br>
          <a href="">Aplicativo para Android</a>
          <p>Caso você não saiba do que se trata esse e-mail, apenas <u>ignore esse e-mail</u>.</p>
        </div>
        `.trim(),
        })

        console.log(nodemailer.getTestMessageUrl(message))
      }),
    )

    this.redirectFn(`http://localhost:3000/trips/${tripId}`)
  }
}
