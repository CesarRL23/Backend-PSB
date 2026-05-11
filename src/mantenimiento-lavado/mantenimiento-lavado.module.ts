import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MantenimientoLavado } from './entities/mantenimiento-lavado.entity';
import { MantenimientoLavadoService } from './mantenimiento-lavado.service';
import { MantenimientoLavadoController } from './mantenimiento-lavado.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MantenimientoLavado])],
  controllers: [MantenimientoLavadoController],
  providers: [MantenimientoLavadoService],
  exports: [MantenimientoLavadoService],
})
export class MantenimientoLavadoModule {}