import { Module } from '@nestjs/common';
import { TrampaService } from './trampa.service';
import { TrampaController } from './trampa.controller';
import { Trampa } from './entities/trampa.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Trampa])],
  controllers: [TrampaController],
  providers: [TrampaService],
})
export class TrampaModule {}
