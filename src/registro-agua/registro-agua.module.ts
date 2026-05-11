import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RegistroAgua } from './entities/registro-agua.entity';
import { RegistroAguaService } from './registro-agua.service';
import { RegistroAguaController } from './registro-agua.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegistroAgua])],
  controllers: [RegistroAguaController],
  providers: [RegistroAguaService],
  exports: [RegistroAguaService],
})
export class RegistroAguaModule {}