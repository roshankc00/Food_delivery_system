import { Module } from '@nestjs/common';
import { HahaService } from './haha.service';
import { HahaController } from './haha.controller';

@Module({
  controllers: [HahaController],
  providers: [HahaService],
})
export class HahaModule {}
