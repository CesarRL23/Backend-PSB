import { Module } from '@nestjs/common';
import { AreaPlagasService } from './area-plagas.service';
import { AreaPlagasController } from './area-plagas.controller';

@Module({
  controllers: [AreaPlagasController],
  providers: [AreaPlagasService],
})
export class AreaPlagasModule {}
