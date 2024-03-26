import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, HealthModule } from '@app/common';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    // MailerModule.forRootAsync({
    //   useFactory: async (config: ConfigService) => ({
    //     transport: {
    //       host: config.get('SMTP_HOST'),
    //       secure: true,
    //       auth: {
    //         user: config.get('SMTP_MAIL'),
    //         pass: config.get('SMTP_PASSWORD'),
    //       },
    //     },
    //     defaults: {
    //       from: config.get('SMTP_MAIL'),
    //     },
    //   }),
    //   inject: [ConfigService],
    // }),
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.TCP,
        options: {
          host: 'localhost',
          port: 3001,
        },
      },
    ]),
    HealthModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, ConfigService],
})
export class NotificationModule {}
