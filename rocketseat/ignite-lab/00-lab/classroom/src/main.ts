import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      },
    },
  })

  app
    .startAllMicroservices()
    .then(() => console.log('[Classroom] Microservice running'))

  app
    .listen(3334)
    .then(() => console.log('🔥 server running on http://localhost:3334'))
}

bootstrap()
