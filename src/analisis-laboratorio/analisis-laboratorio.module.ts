import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AnalisisLaboratorio } from './entities/analisis-laboratorio.entity';
import { AnalisisLaboratorioService } from './analisis-laboratorio.service';
import { AnalisisLaboratorioController } from './analisis-laboratorio.controller';
import { NotificationsModule } from '../notifications/notifications.module';
import { AccionCorrectivaAguaModule } from '../accion-correctiva-agua/accion-correctiva-agua.module';
import { AguaSharedModule } from '../modules/agua/shared/agua-shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AnalisisLaboratorio]),
    NotificationsModule,
    AccionCorrectivaAguaModule,
    AguaSharedModule,
  ],
  controllers: [AnalisisLaboratorioController],
  providers: [AnalisisLaboratorioService],
  exports: [AnalisisLaboratorioService],
})
export class AnalisisLaboratorioModule {}
