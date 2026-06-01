import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EquipoArea } from './entities/equipo-area.entity';
import { EquipoAreaService } from './equipo-area.service';
import { EquipoAreaController } from './equipo-area.controller';

@Module({
  imports: [TypeOrmModule.forFeature([EquipoArea])],
  controllers: [EquipoAreaController],
  providers: [EquipoAreaService],
  exports: [EquipoAreaService],
})
export class EquipoAreaModule {}
