import { Module } from '@nestjs/common';
import { PlanPsbService } from './plan-psb.service';
import { PlanPsbController } from './plan-psb.controller';

@Module({
  controllers: [PlanPsbController],
  providers: [PlanPsbService],
})
export class PlanPsbModule {}
