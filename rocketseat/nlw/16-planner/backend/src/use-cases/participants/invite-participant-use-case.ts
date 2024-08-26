import nodemailer from 'nodemailer'

import { AppError } from '../../errors/app-error'
import { dayjs } from '../../lib/dayjs'
import { getMailClient } from '../../lib/mail'
import { ParticipantsRepository } from '../../repositories/participants-repository'
import { TripsRepository } from '../../repositories/trips-repository'

interface InviteParticipantUseCaseRequest {
  tripId: string
  email: string
}

export class InviteParticipantUseCase {
  constructor(
    private tripsRepository: TripsRepository,
    private participantsRepository: ParticipantsRepository,
  ) {}

  async execute({ email, tripId }: InviteParticipantUseCaseRequest) {
    const trip = await this.tripsRepository.findById(tripId)

    if (!trip) {
      throw new AppError(404, 'Trip not found.')
    }

    const participant = await this.participantsRepository.create({
      email,
      tripId,
    })

    const startsAtDay = dayjs(trip.startsAt).get('D')
    const formattedStartsAt = dayjs(trip.endsAt).format('LL')

    const confirmationLink = `http://localhost:3333/participants/${participant.id}/confirm`

    const mail = await getMailClient()

    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'oi@planner.com',
      },
      to: email,
      subject: `Confirme sua viagem para ${trip.destination}`,
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
        <p>Você solicitou a criação de uma viagem para <strong>${trip.destination}</strong> nas datas de <strong>${startsAtDay} à ${formattedStartsAt}</strong>.</p>
        <p>Para confirmar sua viagem, clique no link abaixo:</p>
        <p>
          <a href="${confirmationLink}">Confirmar viagem</a>
        </p>
        <p>Caso esteja usando o dispositivo móvel, você também pode confirmar a criação da viagem pelos aplicativos:</p>
        <a href="">Aplicativo para iPhone</a><br>
        <a href="">Aplicativo para Android</a>
        <p>Caso você não saiba do que se trata esse e-mail, apenas <u>ignore esse e-mail</u>.</p>
      </div>
      `.trim(),
    })

    console.log(nodemailer.getTestMessageUrl(message))

    return participant
  }
}
