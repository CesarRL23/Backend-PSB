import { Module } from '@nestjs/common';
import { VersionPlanController } from './version-plan.controller';
import { VersionPlanService } from './version-plan.service';

@Module({
  controllers: [VersionPlanController],
  providers: [VersionPlanService]
})
export class VersionPlanModule {}
