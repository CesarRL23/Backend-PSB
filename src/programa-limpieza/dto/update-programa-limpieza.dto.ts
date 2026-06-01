import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaLimpiezaDto } from './create-programa-limpieza.dto';

export class UpdateProgramaLimpiezaDto extends PartialType(CreateProgramaLimpiezaDto) {}
