import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaAguaDto } from './create-programa-agua.dto';

export class UpdateProgramaAguaDto extends PartialType(CreateProgramaAguaDto) {}
