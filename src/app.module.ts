import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DealsModule } from './deals/deals.module';
import { P2pModule } from './p2p/p2p.module';
import { NotificationsModule } from './notifications/notifications.module';
import { GarantModule } from './garant/garant.module';
import { LogsModule } from './logs/logs.module';
import { SettingsModule } from './settings/settings.module';
import { ConfigModule } from '@nestjs/config';
import { SentryGlobalFilter, SentryModule } from "@sentry/nestjs/setup";
import { APP_FILTER } from '@nestjs/core';
import { PrismaService } from './prisma.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { SecurityMiddleware } from './security.middleware';
import { TransactionsModule } from './transactions/transactions.module';



@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          name: 'global',
          ttl: 60000, // Время жизни в миллисекундах (60 секунд)
          limit: 100, // Максимум 100 запросов за период
        },
      ],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SentryModule.forRoot(),
    UsersModule, AuthModule, 
    DealsModule, P2pModule, 
    NotificationsModule, GarantModule, 
    LogsModule, SettingsModule, TransactionsModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: SentryGlobalFilter,
    },
    PrismaService,
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(SecurityMiddleware)
      .forRoutes('*');
  }
}
