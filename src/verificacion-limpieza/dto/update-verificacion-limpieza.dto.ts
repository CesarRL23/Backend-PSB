import { PartialType } from '@nestjs/mapped-types';
import { CreateVerificacionLimpiezaDto } from './create-verificacion-limpieza.dto';

export class UpdateVerificacionLimpiezaDto extends PartialType(CreateVerificacionLimpiezaDto) {}
