import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ControlDiarioPotabilidad } from './entities/control-diario-potabilidad.entity';
import { ControlDiarioPotabilidadService } from './control-diario-potabilidad.service';
import { ControlDiarioPotabilidadController } from './control-diario-potabilidad.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { AguaSharedModule } from '../modules/agua/shared/agua-shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ControlDiarioPotabilidad]),
    NotificationsModule,
    AguaSharedModule,
  ],
  controllers: [ControlDiarioPotabilidadController],
  providers: [ControlDiarioPotabilidadService],
  exports: [ControlDiarioPotabilidadService],
})
export class ControlDiarioPotabilidadModule {}
