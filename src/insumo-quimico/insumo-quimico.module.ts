import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { InsumoQuimico } from './entities/insumo-quimico.entity';
import { InsumoQuimicoService } from './insumo-quimico.service';
import { InsumoQuimicoController } from './insumo-quimico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([InsumoQuimico])],
  controllers: [InsumoQuimicoController],
  providers: [InsumoQuimicoService],
  exports: [InsumoQuimicoService],
})
export class InsumoQuimicoModule {}