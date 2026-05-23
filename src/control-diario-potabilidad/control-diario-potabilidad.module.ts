import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ControlDiarioPotabilidad } from './entities/control-diario-potabilidad.entity';
import { ControlDiarioPotabilidadService } from './control-diario-potabilidad.service';
import { ControlDiarioPotabilidadController } from './control-diario-potabilidad.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { RegistroModule } from '../registro/registro.module';
import { RegistroAguaModule } from '../registro-agua/registro-agua.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ControlDiarioPotabilidad, FuenteAgua]),
    NotificationsModule,
    RegistroModule,
    RegistroAguaModule,
  ],
  controllers: [ControlDiarioPotabilidadController],
  providers: [ControlDiarioPotabilidadService],
  exports: [ControlDiarioPotabilidadService],
})
export class ControlDiarioPotabilidadModule {}
