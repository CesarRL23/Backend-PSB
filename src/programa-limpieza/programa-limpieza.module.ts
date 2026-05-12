import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramaLimpieza } from './entities/programa-limpieza.entity';
import { ProgramaLimpiezaService } from './programa-limpieza.service';
import { ProgramaLimpiezaController } from './programa-limpieza.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaLimpieza])],
  controllers: [ProgramaLimpiezaController],
  providers: [ProgramaLimpiezaService],
  exports: [ProgramaLimpiezaService],
})
export class ProgramaLimpiezaModule {}
