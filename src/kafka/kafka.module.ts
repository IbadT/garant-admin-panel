import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaService } from './kafka.service';
// import { DealConsumer } from './consumers/deal.consumer';
// import { NotificationConsumer } from './consumers/notification.consumer';
import { join } from 'path';



// !!!!!!!!!  ПРИМЕР !!!!!!!!



@Module({
  imports: [
    ClientsModule.registerAsync([
        {
          name: 'KAFKA_SERVICE',
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            transport: Transport.GRPC,
            options: {
              package: 'garant',
              protoPath: join(process.cwd(), 'src/proto/garant.proto'),
              url: configService.get<string>('DEALS_SERVICE_URL') || 'localhost:50051',
            },
          }),
          inject: [ConfigService],
        },
    ])
  ],
//   providers: [KafkaService, DealConsumer, NotificationConsumer],
  providers: [KafkaService],
  exports: [KafkaService],
})
export class KafkaModule {}