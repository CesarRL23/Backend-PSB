import { Module } from '@nestjs/common';
import { TrampaService } from './trampa.service';
import { TrampaController } from './trampa.controller';

@Module({
  controllers: [TrampaController],
  providers: [TrampaService],
})
export class TrampaModule {}
