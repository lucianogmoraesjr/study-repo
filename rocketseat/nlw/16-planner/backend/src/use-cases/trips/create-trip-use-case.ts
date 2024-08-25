import nodemailer from 'nodemailer'

import { AppError } from '../../errors/app-error'
import { dayjs } from '../../lib/dayjs'
import { getMailClient } from '../../lib/mail'
import { TripsRepository } from '../../repositories/trips-repository'

interface CreateTripUseCaseRequest {
  destination: string
  startsAt: Date
  endsAt: Date
  ownerEmail: string
  ownerName: string
  emailsToInvite?: string[]
}

export class CreateTripUseCase {
  constructor(private tripsRepository: TripsRepository) {}

  async execute({
    destination,
    endsAt,
    startsAt,
    ownerEmail,
    ownerName,
    emailsToInvite,
  }: CreateTripUseCaseRequest) {
    if (dayjs(startsAt).isBefore(new Date())) {
      throw new AppError(400, 'Invalid trip start date.')
    }

    if (dayjs(endsAt).isBefore(new Date())) {
      throw new AppError(400, 'Invalid trip end date.')
    }

    const trip = await this.tripsRepository.create({
      destination,
      endsAt,
      startsAt,
      ownerEmail,
      ownerName,
      emailsToInvite,
    })

    const startsAtDay = dayjs(startsAt).get('D')
    const formattedStartsAt = dayjs(endsAt).format('LL')

    const confirmationLink = `http://localhost:3333/trips/${trip.id}/confirm`

    const mail = await getMailClient()

    const message = await mail.sendMail({
      from: {
        name: 'Equipe plann.er',
        address: 'oi@planner.com',
      },
      to: {
        name: ownerName,
        address: ownerEmail,
      },
      subject: `Confirme sua viagem para ${destination}`,
      html: `
      <div style="font-family: sans-serif; font-size: 16px; line-height: 1.6;">
        <p>Você solicitou a criação de uma viagem para <strong>${destination}</strong> nas datas de <strong>${startsAtDay} à ${formattedStartsAt}</strong>.</p>
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

    return trip
  }
}
