import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalisisLaboratorio } from './entities/analisis-laboratorio.entity';
import { AnalisisLaboratorioService } from './analisis-laboratorio.service';
import { AnalisisLaboratorioController } from './analisis-laboratorio.controller';

@Module({
  imports: [TypeOrmModule.forFeature([AnalisisLaboratorio])],
  controllers: [AnalisisLaboratorioController],
  providers: [AnalisisLaboratorioService],
  exports: [AnalisisLaboratorioService],
})
export class AnalisisLaboratorioModule {}