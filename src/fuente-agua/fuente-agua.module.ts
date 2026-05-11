import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FuenteAgua } from './entities/fuente-agua.entity';
import { FuenteAguaService } from './fuente-agua.service';
import { FuenteAguaController } from './fuente-agua.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FuenteAgua])],
  controllers: [FuenteAguaController],
  providers: [FuenteAguaService],
  exports: [FuenteAguaService],
})
export class FuenteAguaModule {}