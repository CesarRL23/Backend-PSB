import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccionCorrectivaAgua } from './entities/accion-correctiva-agua.entity';
import { AccionCorrectivaAguaService } from './accion-correctiva-agua.service';
import { AccionCorrectivaAguaController } from './accion-correctiva-agua.controller';
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { RegistroModule } from '../registro/registro.module';
import { RegistroAguaModule } from '../registro-agua/registro-agua.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AccionCorrectivaAgua, FuenteAgua]),
    RegistroModule,
    RegistroAguaModule,
  ],
  controllers: [AccionCorrectivaAguaController],
  providers: [AccionCorrectivaAguaService],
  exports: [AccionCorrectivaAguaService],
})
export class AccionCorrectivaAguaModule {}
