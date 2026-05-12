import { Module } from '@nestjs/common';
import { EvidenciaPlagasService } from './evidencia-plagas.service';
import { EvidenciaPlagasController } from './evidencia-plagas.controller';

@Module({
  controllers: [EvidenciaPlagasController],
  providers: [EvidenciaPlagasService],
})
export class EvidenciaPlagasModule {}
