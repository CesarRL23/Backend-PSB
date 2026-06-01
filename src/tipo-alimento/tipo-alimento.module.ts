import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAlimentoService } from './tipo-alimento.service';
import { TipoAlimentoController } from './tipo-alimento.controller';
import { TipoAlimento } from './entities/tipo-alimento.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoAlimento])],
  controllers: [TipoAlimentoController],
  providers: [TipoAlimentoService],
})
export class TipoAlimentoModule {}
