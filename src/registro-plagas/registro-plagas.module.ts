import { Module } from '@nestjs/common';
import { RegistroPlagasService } from './registro-plagas.service';
import { RegistroPlagasController } from './registro-plagas.controller';
import { RegistroPlagas } from './entities/registro-plagas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroPlagas])],
  controllers: [RegistroPlagasController],
  providers: [RegistroPlagasService],
})
export class RegistroPlagasModule {}
