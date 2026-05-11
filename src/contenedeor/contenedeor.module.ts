import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContenedeorService } from './contenedeor.service';
import { ContenedeorController } from './contenedeor.controller';
import { Contenedeor } from './entities/contenedeor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Contenedeor])],
  controllers: [ContenedeorController],
  providers: [ContenedeorService],
})
export class ContenedeorModule {}
