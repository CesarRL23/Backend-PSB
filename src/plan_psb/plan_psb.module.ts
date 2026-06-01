import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PlanPsbService } from './plan_psb.service';
import { PlanPsbController } from './plan_psb.controller';
import { PlanPsb } from './entities/plan_psb.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';
import { TipoAlimento } from 'src/tipo-alimento/entities/tipo-alimento.entity';
import { Programa } from 'src/programa/entities/programa.entity';
import { ProgramaLimpieza } from 'src/programa-limpieza/entities/programa-limpieza.entity';
import { ProgramaAgua } from 'src/programa-agua/entities/programa-agua.entity';
import { ProgramaPlagas } from 'src/programa-plagas/entities/programa-plagas.entity';
import { ProgramaResiduo } from 'src/programa-residuos/entities/programa-residuo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PlanPsb,
      Empresa,
      TipoAlimento,
      Programa,
      ProgramaLimpieza,
      ProgramaAgua,
      ProgramaPlagas,
      ProgramaResiduo,
    ]),
  ],
  controllers: [PlanPsbController],
  providers: [PlanPsbService],
})
export class PlanPsbModule {}
