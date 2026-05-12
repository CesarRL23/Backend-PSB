import { PartialType } from '@nestjs/mapped-types';
import { CreateChecklistResiduoDto } from './create-checklist-residuo.dto';

export class UpdateChecklistResiduoDto extends PartialType(CreateChecklistResiduoDto) {}
