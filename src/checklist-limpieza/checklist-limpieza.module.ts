import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChecklistLimpieza } from './entities/checklist-limpieza.entity';
import { ChecklistLimpiezaService } from './checklist-limpieza.service';
import { ChecklistLimpiezaController } from './checklist-limpieza.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ChecklistLimpieza])],
  controllers: [ChecklistLimpiezaController],
  providers: [ChecklistLimpiezaService],
  exports: [ChecklistLimpiezaService],
})
export class ChecklistLimpiezaModule {}
