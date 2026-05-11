import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegistroLimpieza } from './entities/registro-limpieza.entity';
import { RegistroLimpiezaService } from './registro-limpieza.service';
import { RegistroLimpiezaController } from './registro-limpieza.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroLimpieza])],
  controllers: [RegistroLimpiezaController],
  providers: [RegistroLimpiezaService],
  exports: [RegistroLimpiezaService],
})
export class RegistroLimpiezaModule {}
