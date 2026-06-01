import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroResiduosService } from './registro-residuos.service';
import { RegistroResiduosController } from './registro-residuos.controller';
import { RegistroResiduo } from './entities/registro-residuo.entity';
import { ProgramaResiduo } from '../programa-residuos/entities/programa-residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroResiduo, ProgramaResiduo])],
  controllers: [RegistroResiduosController],
  providers: [RegistroResiduosService],
})
export class RegistroResiduosModule {}
