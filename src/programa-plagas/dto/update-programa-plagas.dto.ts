import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaPlagasDto } from './create-programa-plagas.dto';

export class UpdateProgramaPlagasDto extends PartialType(CreateProgramaPlagasDto) {}
