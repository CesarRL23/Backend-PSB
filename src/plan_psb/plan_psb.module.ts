import { Module } from '@nestjs/common';
import { PlanPsbService } from './plan_psb.service';
import { PlanPsbController } from './plan_psb.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlanPsb } from './entities/plan_psb.entity';
import { Empresa } from 'src/empresa/entities/empresa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlanPsb, Empresa])],
  controllers: [PlanPsbController],
  providers: [PlanPsbService],
})
export class PlanPsbModule {}
