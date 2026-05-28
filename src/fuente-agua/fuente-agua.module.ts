import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FuenteAgua } from './entities/fuente-agua.entity';
import { FuenteAguaService } from './fuente-agua.service';
import { FuenteAguaController } from './fuente-agua.controller';
import { ControlDiarioPotabilidad } from '../control-diario-potabilidad/entities/control-diario-potabilidad.entity';
import { AnalisisLaboratorio } from '../analisis-laboratorio/entities/analisis-laboratorio.entity';
import { MantenimientoLavado } from '../mantenimiento-lavado/entities/mantenimiento-lavado.entity';
import { AccionCorrectivaAgua } from '../accion-correctiva-agua/entities/accion-correctiva-agua.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      FuenteAgua,
      ControlDiarioPotabilidad,
      AnalisisLaboratorio,
      MantenimientoLavado,
      AccionCorrectivaAgua,
    ]),
  ],
  controllers: [FuenteAguaController],
  providers: [FuenteAguaService],
  exports: [FuenteAguaService],
})
export class FuenteAguaModule {}