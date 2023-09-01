import nodemailer, { Transporter } from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'node:fs';
import { IMailProvider } from '../IMailProvider';

export class GmailMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.GMAIL_SMTP_USER,
        pass: process.env.GMAIL_SMTP_PASS,
      },
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string,
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(templateFileContent);

    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'RentX <noreply@rentx.com.br>',
      subject,
      html: templateHTML,
    });
  }
}
