import { Module } from '@nestjs/common';
import { TipoPlagaService } from './tipo-plaga.service';
import { TipoPlagaController } from './tipo-plaga.controller';

@Module({
  controllers: [TipoPlagaController],
  providers: [TipoPlagaService],
})
export class TipoPlagaModule {}
