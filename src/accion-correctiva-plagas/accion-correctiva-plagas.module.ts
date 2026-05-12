import { Module } from '@nestjs/common';
import { AccionCorrectivaPlagasService } from './accion-correctiva-plagas.service';
import { AccionCorrectivaPlagasController } from './accion-correctiva-plagas.controller';

@Module({
  controllers: [AccionCorrectivaPlagasController],
  providers: [AccionCorrectivaPlagasService],
})
export class AccionCorrectivaPlagasModule {}
