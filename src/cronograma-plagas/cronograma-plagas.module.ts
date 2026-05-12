import { Module } from '@nestjs/common';
import { CronogramaPlagasService } from './cronograma-plagas.service';
import { CronogramaPlagasController } from './cronograma-plagas.controller';
import { CronogramaPlagas } from './entities/cronograma-plagas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([CronogramaPlagas])],
  controllers: [CronogramaPlagasController],
  providers: [CronogramaPlagasService],
})
export class CronogramaPlagasModule {}
