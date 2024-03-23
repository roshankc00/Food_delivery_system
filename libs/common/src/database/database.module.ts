import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'nestjsauth',
      password: 'nestjsauth',
      database: 'nestjsauth',
      entities: ['dist/apps/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  exports: [],
})
export class DatabaseModule {}
