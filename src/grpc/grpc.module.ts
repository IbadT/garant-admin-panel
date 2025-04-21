import { Module } from '@nestjs/common';
import { GrpcService } from './grpc.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';



// !!!!!!!!!  ПРИМЕР !!!!!!!!



@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'DEAL_SERVICE',
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'deal',
            protoPath: join(__dirname, '../../proto/deal.proto'),
            url: config.get('GRPC_DEAL_SERVICE_URL'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [GrpcService],
  controllers: [],
  exports: [GrpcService],
})
export class GrpcModule {}