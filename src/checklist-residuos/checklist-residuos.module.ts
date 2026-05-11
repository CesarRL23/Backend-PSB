import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChecklistResiduosService } from './checklist-residuos.service';
import { ChecklistResiduosController } from './checklist-residuos.controller';
import { ChecklistResiduo } from './entities/checklist-residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistResiduo])],
  controllers: [ChecklistResiduosController],
  providers: [ChecklistResiduosService],
})
export class ChecklistResiduosModule {}
