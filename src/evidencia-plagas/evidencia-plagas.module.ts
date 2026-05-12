import { Module } from '@nestjs/common';
import { EvidenciaPlagasService } from './evidencia-plagas.service';
import { EvidenciaPlagasController } from './evidencia-plagas.controller';
import { EvidenciaPlagas } from './entities/evidencia-plagas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([EvidenciaPlagas])],
  controllers: [EvidenciaPlagasController],
  providers: [EvidenciaPlagasService],
})
export class EvidenciaPlagasModule {}
