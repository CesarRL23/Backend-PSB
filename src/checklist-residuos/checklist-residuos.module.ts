import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChecklistResiduosService } from './checklist-residuos.service';
import { ChecklistResiduosController } from './checklist-residuos.controller';
import { ChecklistResiduo } from './entities/checklist-residuo.entity';
import { RegistroResiduo } from '../registro-residuos/entities/registro-residuo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ChecklistResiduo,
      RegistroResiduo,
    ]),
  ],
  controllers: [ChecklistResiduosController],
  providers: [ChecklistResiduosService],
})
export class ChecklistResiduosModule {}