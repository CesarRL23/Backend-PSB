import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalisisLaboratorio } from './entities/analisis-laboratorio.entity';
import { AnalisisLaboratorioService } from './analisis-laboratorio.service';
import { AnalisisLaboratorioController } from './analisis-laboratorio.controller';
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { RegistroModule } from '../registro/registro.module';
import { RegistroAguaModule } from '../registro-agua/registro-agua.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalisisLaboratorio, FuenteAgua]),
    RegistroModule,
    RegistroAguaModule,
    NotificationsModule,
  ],
  controllers: [AnalisisLaboratorioController],
  providers: [AnalisisLaboratorioService],
  exports: [AnalisisLaboratorioService],
})
export class AnalisisLaboratorioModule {}
