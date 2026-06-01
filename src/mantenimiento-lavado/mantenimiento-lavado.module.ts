import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MantenimientoLavado } from './entities/mantenimiento-lavado.entity';
import { MantenimientoLavadoService } from './mantenimiento-lavado.service';
import { MantenimientoLavadoController } from './mantenimiento-lavado.controller';
import { AguaSharedModule } from '../modules/agua/shared/agua-shared.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MantenimientoLavado]),
    AguaSharedModule,
    NotificationsModule,
  ],
  controllers: [MantenimientoLavadoController],
  providers: [MantenimientoLavadoService],
  exports: [MantenimientoLavadoService],
})
export class MantenimientoLavadoModule {}
