import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VerificacionLimpieza } from './entities/verificacion-limpieza.entity';
import { VerificacionLimpiezaService } from './verificacion-limpieza.service';
import { VerificacionLimpiezaController } from './verificacion-limpieza.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VerificacionLimpieza])],
  controllers: [VerificacionLimpiezaController],
  providers: [VerificacionLimpiezaService],
  exports: [VerificacionLimpiezaService],
})
export class VerificacionLimpiezaModule {}
