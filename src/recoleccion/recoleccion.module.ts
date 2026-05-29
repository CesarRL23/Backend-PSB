import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoleccionService } from './recoleccion.service';
import { RecoleccionController } from './recoleccion.controller';
import { Recoleccion } from './entities/recoleccion.entity';
import { RegistroResiduo } from 'src/registro-residuos/entities/registro-residuo.entity';
import { TipoResiduo } from 'src/tipo-residuo/entities/tipo-residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recoleccion, RegistroResiduo, TipoResiduo])],
  controllers: [RecoleccionController],
  providers: [RecoleccionService],
})
export class RecoleccionModule {}
