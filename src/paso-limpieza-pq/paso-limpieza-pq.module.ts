import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasoLimpiezaPq } from './entities/paso-limpieza-pq.entity';
import { PasoLimpiezaPqService } from './paso-limpieza-pq.service';
import { PasoLimpiezaPqController } from './paso-limpieza-pq.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PasoLimpiezaPq])],
  controllers: [PasoLimpiezaPqController],
  providers: [PasoLimpiezaPqService],
  exports: [PasoLimpiezaPqService],
})
export class PasoLimpiezaPqModule {}
