import { PartialType } from '@nestjs/mapped-types';
import { CreateVersionPlanDto } from './create-version-plan.dto';

export class UpdateVersionPlanDto extends PartialType(CreateVersionPlanDto) {}
