import { Module } from '@nestjs/common';
import { ProductoQuimicoController } from './producto-quimico.controller';
import { ProductoQuimicoService } from './producto-quimico.service';

@Module({
  controllers: [ProductoQuimicoController],
  providers: [ProductoQuimicoService]
})
export class ProductoQuimicoModule {}
