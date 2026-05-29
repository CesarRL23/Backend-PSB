import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaResiduosService } from './programa-residuos.service';
import { ProgramaResiduosController } from './programa-residuos.controller';
import { ProgramaResiduo } from './entities/programa-residuo.entity';
import { Programa } from '../programa/entities/programa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaResiduo, Programa])],
  controllers: [ProgramaResiduosController],
  providers: [ProgramaResiduosService],
})
export class ProgramaResiduosModule {}
