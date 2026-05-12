import { Module } from '@nestjs/common';
import { PlaguicidaService } from './plaguicida.service';
import { PlaguicidaController } from './plaguicida.controller';
import { Plaguicida } from './entities/plaguicida.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plaguicida])],
  controllers: [PlaguicidaController],
  providers: [PlaguicidaService],
})
export class PlaguicidaModule {}
