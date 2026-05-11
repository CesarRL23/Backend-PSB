import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AreaGenereacionService } from './area-genereacion.service';
import { AreaGenereacionController } from './area-genereacion.controller';
import { AreaGenereacion } from './entities/area-genereacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AreaGenereacion])],
  controllers: [AreaGenereacionController],
  providers: [AreaGenereacionService],
})
export class AreaGenereacionModule {}
