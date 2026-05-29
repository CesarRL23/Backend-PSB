import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EvidenciaResiduosService } from './evidencia-residuos.service';
import { EvidenciaResiduosController } from './evidencia-residuos.controller';
import { EvidenciaResiduo } from './entities/evidencia-residuo.entity';
import { RegistroResiduo } from '../registro-residuos/entities/registro-residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EvidenciaResiduo, RegistroResiduo])],
  controllers: [EvidenciaResiduosController],
  providers: [EvidenciaResiduosService],
})
export class EvidenciaResiduosModule {}
