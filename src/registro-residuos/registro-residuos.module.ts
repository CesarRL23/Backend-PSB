import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroResiduosService } from './registro-residuos.service';
import { RegistroResiduosController } from './registro-residuos.controller';
import { RegistroResiduo } from './entities/registro-residuo.entity';
import { Registro } from '../registro/entities/registro.entity';
import { Recoleccion } from '../recoleccion/entities/recoleccion.entity';
import { ChecklistResiduo } from '../checklist-residuos/entities/checklist-residuo.entity';
import { EvidenciaResiduo } from '../evidencia-residuos/entities/evidencia-residuo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      RegistroResiduo,
      Registro,
      Recoleccion,
      ChecklistResiduo,
      EvidenciaResiduo,
    ]),
  ],
  controllers: [RegistroResiduosController],
  providers: [RegistroResiduosService],
})
export class RegistroResiduosModule {}
