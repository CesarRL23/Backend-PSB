import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MedicionPaso } from './entities/medicion-paso.entity';
import { MedicionPasoService } from './medicion-paso.service';
import { MedicionPasoController } from './medicion-paso.controller';

@Module({
  imports: [TypeOrmModule.forFeature([MedicionPaso])],
  controllers: [MedicionPasoController],
  providers: [MedicionPasoService],
  exports: [MedicionPasoService],
})
export class MedicionPasoModule {}
