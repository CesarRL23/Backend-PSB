import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistroResiduosService } from './registro-residuos.service';
import { RegistroResiduosController } from './registro-residuos.controller';
import { RegistroResiduo } from './entities/registro-residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroResiduo])],
  controllers: [RegistroResiduosController],
  providers: [RegistroResiduosService],
})
export class RegistroResiduosModule {}
