import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ControlDiarioPotabilidad } from './entities/control-diario-potabilidad.entity';
import { ControlDiarioPotabilidadService } from './control-diario-potabilidad.service';
import { ControlDiarioPotabilidadController } from './control-diario-potabilidad.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ControlDiarioPotabilidad])],
  controllers: [ControlDiarioPotabilidadController],
  providers: [ControlDiarioPotabilidadService],
  exports: [ControlDiarioPotabilidadService],
})
export class ControlDiarioPotabilidadModule {}