import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Programa } from './entities/programa.entity';
import { ProgramaService } from './programa.service';
import { ProgramaController } from './programa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Programa])],
  controllers: [ProgramaController],
  providers: [ProgramaService],
  exports: [ProgramaService],
})
export class ProgramaModule {}