import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TanqueAlmacenamiento } from './entities/tanque-almacenamiento.entity';
import { TanqueAlmacenamientoService } from './tanque-almacenamiento.service';
import { TanqueAlmacenamientoController } from './tanque-almacenamiento.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TanqueAlmacenamiento])],
  controllers: [TanqueAlmacenamientoController],
  providers: [TanqueAlmacenamientoService],
  exports: [TanqueAlmacenamientoService],
})
export class TanqueAlmacenamientoModule {}