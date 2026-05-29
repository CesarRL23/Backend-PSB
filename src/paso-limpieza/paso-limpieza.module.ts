import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasoLimpieza } from './entities/paso-limpieza.entity';
import { PasoLimpiezaService } from './paso-limpieza.service';
import { PasoLimpiezaController } from './paso-limpieza.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PasoLimpieza])],
  controllers: [PasoLimpiezaController],
  providers: [PasoLimpiezaService],
  exports: [PasoLimpiezaService],
})
export class PasoLimpiezaModule {}
