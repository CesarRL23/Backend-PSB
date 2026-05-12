import { Module } from '@nestjs/common';
import { EmpresaFumigadoraService } from './empresa-fumigadora.service';
import { EmpresaFumigadoraController } from './empresa-fumigadora.controller';

@Module({
  controllers: [EmpresaFumigadoraController],
  providers: [EmpresaFumigadoraService],
})
export class EmpresaFumigadoraModule {}
