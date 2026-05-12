import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoResiduoService } from './tipo-residuo.service';
import { TipoResiduoController } from './tipo-residuo.controller';
import { TipoResiduo } from './entities/tipo-residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoResiduo])],
  controllers: [TipoResiduoController],
  providers: [TipoResiduoService],
})
export class TipoResiduoModule {}
