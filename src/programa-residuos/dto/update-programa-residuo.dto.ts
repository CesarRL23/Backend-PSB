import { PartialType } from '@nestjs/mapped-types';
import { CreateProgramaResiduoDto } from './create-programa-residuo.dto';

export class UpdateProgramaResiduoDto extends PartialType(CreateProgramaResiduoDto) {}
