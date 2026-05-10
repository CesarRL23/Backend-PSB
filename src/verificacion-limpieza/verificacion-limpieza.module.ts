import { Module } from '@nestjs/common';
import { VerificacionLimpiezaController } from './verificacion-limpieza.controller';
import { VerificacionLimpiezaService } from './verificacion-limpieza.service';

@Module({
  controllers: [VerificacionLimpiezaController],
  providers: [VerificacionLimpiezaService]
})
export class VerificacionLimpiezaModule {}
