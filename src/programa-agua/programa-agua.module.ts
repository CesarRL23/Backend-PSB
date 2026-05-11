import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProgramaAgua } from './entities/programa-agua.entity';
import { ProgramaAguaService } from './programa-agua.service';
import { ProgramaAguaController } from './programa-agua.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaAgua])],
  controllers: [ProgramaAguaController],
  providers: [ProgramaAguaService],
  exports: [ProgramaAguaService],
})
export class ProgramaAguaModule {}
