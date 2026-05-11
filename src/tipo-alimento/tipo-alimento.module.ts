import { Module } from '@nestjs/common';
import { TipoAlimentoService } from './tipo-alimento.service';
import { TipoAlimentoController } from './tipo-alimento.controller';

@Module({
  controllers: [TipoAlimentoController],
  providers: [TipoAlimentoService],
})
export class TipoAlimentoModule {}
