import { PartialType } from '@nestjs/mapped-types';
import { CreateChecklistLimpiezaDto } from './create-checklist-limpieza.dto';

export class UpdateChecklistLimpiezaDto extends PartialType(CreateChecklistLimpiezaDto) {}
