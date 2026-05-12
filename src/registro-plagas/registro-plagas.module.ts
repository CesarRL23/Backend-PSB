import { Module } from '@nestjs/common';
import { RegistroPlagasService } from './registro-plagas.service';
import { RegistroPlagasController } from './registro-plagas.controller';

@Module({
  controllers: [RegistroPlagasController],
  providers: [RegistroPlagasService],
})
export class RegistroPlagasModule {}
