import { Module } from '@nestjs/common';
import { OperarioController } from './operario.controller';
import { OperarioService } from './operario.service';

@Module({
  controllers: [OperarioController],
  providers: [OperarioService]
})
export class OperarioModule {}
