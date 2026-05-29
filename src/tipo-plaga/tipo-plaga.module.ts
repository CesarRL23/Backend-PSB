import { Module } from '@nestjs/common';
import { TipoPlagaService } from './tipo-plaga.service';
import { TipoPlagaController } from './tipo-plaga.controller';
import { TipoPlaga } from './entities/tipo-plaga.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipoPlaga])],
  controllers: [TipoPlagaController],
  providers: [TipoPlagaService],
})
export class TipoPlagaModule {}
