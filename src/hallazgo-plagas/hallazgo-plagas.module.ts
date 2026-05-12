import { Module } from '@nestjs/common';
import { HallazgoPlagasService } from './hallazgo-plagas.service';
import { HallazgoPlagasController } from './hallazgo-plagas.controller';

@Module({
  controllers: [HallazgoPlagasController],
  providers: [HallazgoPlagasService],
})
export class HallazgoPlagasModule {}
