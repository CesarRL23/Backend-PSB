import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductoQuimico } from './entities/producto-quimico.entity';
import { ProductoQuimicoService } from './producto-quimico.service';
import { ProductoQuimicoController } from './producto-quimico.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ProductoQuimico])],
  controllers: [ProductoQuimicoController],
  providers: [ProductoQuimicoService],
  exports: [ProductoQuimicoService],
})
export class ProductoQuimicoModule {}
