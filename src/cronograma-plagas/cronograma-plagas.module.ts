import { Module } from '@nestjs/common';
import { CronogramaPlagasService } from './cronograma-plagas.service';
import { CronogramaPlagasController } from './cronograma-plagas.controller';

@Module({
  controllers: [CronogramaPlagasController],
  providers: [CronogramaPlagasService],
})
export class CronogramaPlagasModule {}
