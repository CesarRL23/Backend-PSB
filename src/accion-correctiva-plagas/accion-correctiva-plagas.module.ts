import { Module } from '@nestjs/common';
import { AccionCorrectivaPlagasService } from './accion-correctiva-plagas.service';
import { AccionCorrectivaPlagasController } from './accion-correctiva-plagas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccionCorrectivaPlagas } from './entities/accion-correctiva-plagas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AccionCorrectivaPlagas])],
  controllers: [AccionCorrectivaPlagasController],
  providers: [AccionCorrectivaPlagasService],
})
export class AccionCorrectivaPlagasModule {}
