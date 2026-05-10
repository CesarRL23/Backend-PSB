import { Module } from '@nestjs/common';
import { PasoLimpiezaController } from './paso-limpieza.controller';
import { PasoLimpiezaService } from './paso-limpieza.service';

@Module({
  controllers: [PasoLimpiezaController],
  providers: [PasoLimpiezaService]
})
export class PasoLimpiezaModule {}
