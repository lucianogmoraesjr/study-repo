import { Module } from '@nestjs/common'
import { KafkaService } from './kafka.service'
import { ConfigModule } from '@nestjs/config'

@Module({
  providers: [KafkaService],
  exports: [KafkaService],
  imports: [ConfigModule.forRoot()],
})
export class MessagingModule {}
