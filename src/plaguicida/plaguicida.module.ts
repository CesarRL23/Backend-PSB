import { Module } from '@nestjs/common';
import { PlaguicidaService } from './plaguicida.service';
import { PlaguicidaController } from './plaguicida.controller';

@Module({
  controllers: [PlaguicidaController],
  providers: [PlaguicidaService],
})
export class PlaguicidaModule {}
