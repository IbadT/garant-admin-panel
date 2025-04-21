import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
import { DealConsumer } from './consumers/deal.consumer';
import { NotificationConsumer } from './consumers/notification.consumer';



// !!!!!!!!!  ПРИМЕР !!!!!!!!



@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [config.get('KAFKA_BROKER')],
            },
            consumer: {
              groupId: 'admin-service-group',
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [KafkaService, DealConsumer, NotificationConsumer],
  exports: [KafkaService],
})
export class KafkaModule {}