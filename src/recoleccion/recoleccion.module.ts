import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoleccionService } from './recoleccion.service';
import { RecoleccionController } from './recoleccion.controller';
import { Recoleccion } from './entities/recoleccion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Recoleccion])],
  controllers: [RecoleccionController],
  providers: [RecoleccionService],
})
export class RecoleccionModule {}
