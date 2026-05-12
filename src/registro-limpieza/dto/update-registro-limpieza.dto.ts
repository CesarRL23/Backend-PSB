import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroLimpiezaDto } from './create-registro-limpieza.dto';

export class UpdateRegistroLimpiezaDto extends PartialType(CreateRegistroLimpiezaDto) {}
