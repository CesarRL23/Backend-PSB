import { Module } from '@nestjs/common';
import { AreaPlagasService } from './area-plagas.service';
import { AreaPlagasController } from './area-plagas.controller';
import { AreaPlagas } from './entities/area-plagas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AreaPlagas])],
  controllers: [AreaPlagasController],
  providers: [AreaPlagasService],
})
export class AreaPlagasModule {}
