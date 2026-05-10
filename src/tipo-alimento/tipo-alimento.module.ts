import { Module } from '@nestjs/common';
import { TipoAlimentoController } from './tipo-alimento.controller';
import { TipoAlimentoService } from './tipo-alimento.service';

@Module({
  controllers: [TipoAlimentoController],
  providers: [TipoAlimentoService]
})
export class TipoAlimentoModule {}
