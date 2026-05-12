import { Module } from '@nestjs/common';
import { DiagnosticoPlagasService } from './diagnostico-plagas.service';
import { DiagnosticoPlagasController } from './diagnostico-plagas.controller';

@Module({
  controllers: [DiagnosticoPlagasController],
  providers: [DiagnosticoPlagasService],
})
export class DiagnosticoPlagasModule {}
