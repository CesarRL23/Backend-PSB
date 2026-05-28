import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccionCorrectivaAgua } from './entities/accion-correctiva-agua.entity';
import { AccionCorrectivaAguaService } from './accion-correctiva-agua.service';
import { AccionCorrectivaAguaController } from './accion-correctiva-agua.controller';
import { AguaSharedModule } from '../modules/agua/shared/agua-shared.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccionCorrectivaAgua]),
    AguaSharedModule,
    NotificationsModule,
  ],
  controllers: [AccionCorrectivaAguaController],
  providers: [AccionCorrectivaAguaService],
  exports: [AccionCorrectivaAguaService],
})
export class AccionCorrectivaAguaModule {}
