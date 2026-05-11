import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroResiduoDto } from './create-registro-residuo.dto';

export class UpdateRegistroResiduoDto extends PartialType(CreateRegistroResiduoDto) {}
