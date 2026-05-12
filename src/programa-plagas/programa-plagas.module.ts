import { Module } from '@nestjs/common';
import { ProgramaPlagasService } from './programa-plagas.service';
import { ProgramaPlagasController } from './programa-plagas.controller';

@Module({
  controllers: [ProgramaPlagasController],
  providers: [ProgramaPlagasService],
})
export class ProgramaPlagasModule {}
