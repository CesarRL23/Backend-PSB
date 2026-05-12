import { Module } from '@nestjs/common';
import { ProgramaPlagasService } from './programa-plagas.service';
import { ProgramaPlagasController } from './programa-plagas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgramaPlagas } from './entities/programa-plagas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProgramaPlagas])],
  controllers: [ProgramaPlagasController],
  providers: [ProgramaPlagasService],
})
export class ProgramaPlagasModule {}
