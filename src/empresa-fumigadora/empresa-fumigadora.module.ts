import { Module } from '@nestjs/common';
import { EmpresaFumigadoraService } from './empresa-fumigadora.service';
import { EmpresaFumigadoraController } from './empresa-fumigadora.controller';
import { EmpresaFumigadora } from './entities/empresa-fumigadora.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EmpresaFumigadora])],
  controllers: [EmpresaFumigadoraController],
  providers: [EmpresaFumigadoraService],
})
export class EmpresaFumigadoraModule {}
