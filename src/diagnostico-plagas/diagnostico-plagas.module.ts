import { Module } from '@nestjs/common';
import { DiagnosticoPlagasService } from './diagnostico-plagas.service';
import { DiagnosticoPlagasController } from './diagnostico-plagas.controller';
import { DiagnosticoPlagas } from './entities/diagnostico-plagas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DiagnosticoPlagas])],
  controllers: [DiagnosticoPlagasController],
  providers: [DiagnosticoPlagasService],
})
export class DiagnosticoPlagasModule {}
