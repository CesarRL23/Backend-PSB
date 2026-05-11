import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AccionCorrectivaAguaService } from './accion-correctiva-agua.service';
import { AccionCorrectivaAguaController } from './accion-correctiva-agua.controller';
import {AccionCorrectivaAgua} from "./entities/accion-correctiva-agua.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccionCorrectivaAgua])],
  controllers: [AccionCorrectivaAguaController],
  providers: [AccionCorrectivaAguaService],
})
export class AccionCorrectivaAguaModule {}
