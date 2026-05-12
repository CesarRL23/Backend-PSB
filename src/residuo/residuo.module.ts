import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResiduoService } from './residuo.service';
import { ResiduoController } from './residuo.controller';
import { Residuo } from './entities/residuo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Residuo])],
  controllers: [ResiduoController],
  providers: [ResiduoService],
})
export class ResiduoModule {}
