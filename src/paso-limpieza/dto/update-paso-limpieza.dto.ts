import { PartialType } from '@nestjs/mapped-types';
import { CreatePasoLimpiezaDto } from './create-paso-limpieza.dto';

export class UpdatePasoLimpiezaDto extends PartialType(CreatePasoLimpiezaDto) {}
