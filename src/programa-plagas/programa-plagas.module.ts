import { Module } from '@nestjs/common';
import { ProgramaPlagasService } from './programa-plagas.service';
import { ProgramaPlagasController } from './programa-plagas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaPlagas } from './entities/programa-plagas.entity';
import { AreaPlagas } from 'src/area-plagas/entities/area-plagas.entity';
import { RegistroPlagas } from 'src/registro-plagas/entities/registro-plagas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaPlagas, RegistroPlagas, AreaPlagas])],
  controllers: [ProgramaPlagasController],
  providers: [ProgramaPlagasService],
})
export class ProgramaPlagasModule {}
