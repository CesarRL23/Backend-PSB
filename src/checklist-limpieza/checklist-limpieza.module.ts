import { Module } from '@nestjs/common';
import { ChecklistLimpiezaController } from './checklist-limpieza.controller';
import { ChecklistLimpiezaService } from './checklist-limpieza.service';

@Module({
  controllers: [ChecklistLimpiezaController],
  providers: [ChecklistLimpiezaService]
})
export class ChecklistLimpiezaModule {}
