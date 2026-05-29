import { Module } from '@nestjs/common';
import { HallazgoPlagasService } from './hallazgo-plagas.service';
import { HallazgoPlagasController } from './hallazgo-plagas.controller';
import { HallazgoPlagas } from './entities/hallazgo-plagas.entity';
import { AccionCorrectivaPlagas } from 'src/accion-correctiva-plagas/entities/accion-correctiva-plagas.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HallazgoPlagas,
      AccionCorrectivaPlagas  // ← agregar esto
    ])
  ],
  controllers: [HallazgoPlagasController],
  providers: [HallazgoPlagasService],
})
export class HallazgoPlagasModule {}