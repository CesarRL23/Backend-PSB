import { Module } from '@nestjs/common';
import { PlanPsbController } from './plan-psb.controller';
import { PlanPsbService } from './plan-psb.service';

@Module({
  controllers: [PlanPsbController],
  providers: [PlanPsbService]
})
export class PlanPsbModule {}
