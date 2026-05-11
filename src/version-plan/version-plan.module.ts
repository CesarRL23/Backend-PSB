import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VersionPlanService } from './version-plan.service';
import { VersionPlanController } from './version-plan.controller';
import { VersionPlan } from './entities/version-plan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VersionPlan])],
  controllers: [VersionPlanController],
  providers: [VersionPlanService],
})
export class VersionPlanModule {}
