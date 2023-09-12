import nodemailer from 'nodemailer'
import { MailAdapter, SendMailData } from '../mail-adapter'

const transport = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ccd78a33b64248',
    pass: 'a21f60b851704c',
  },
})

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ body, subject }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedback Widget <oi@feedback.com>',
      to: 'Luciano Moraes Jr. <lucianogmoraesjr@gmail.com>',
      subject,
      html: body,
    })
  }
}
