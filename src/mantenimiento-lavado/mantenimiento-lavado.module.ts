import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MantenimientoLavado } from './entities/mantenimiento-lavado.entity';
import { MantenimientoLavadoService } from './mantenimiento-lavado.service';
import { MantenimientoLavadoController } from './mantenimiento-lavado.controller';
import { FuenteAgua } from '../fuente-agua/entities/fuente-agua.entity';
import { RegistroModule } from '../registro/registro.module';
import { RegistroAguaModule } from '../registro-agua/registro-agua.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MantenimientoLavado, FuenteAgua]),
    RegistroModule,
    RegistroAguaModule,
  ],
  controllers: [MantenimientoLavadoController],
  providers: [MantenimientoLavadoService],
  exports: [MantenimientoLavadoService],
})
export class MantenimientoLavadoModule {}
