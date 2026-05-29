import { PartialType } from '@nestjs/mapped-types';
import { CreatePlanPsbDto } from './create-plan_psb.dto';

export class UpdatePlanPsbDto extends PartialType(CreatePlanPsbDto) {}
