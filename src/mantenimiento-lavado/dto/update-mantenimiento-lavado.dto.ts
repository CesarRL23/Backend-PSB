import { PartialType } from '@nestjs/mapped-types';
import { CreateMantenimientoLavadoDto } from './create-mantenimiento-lavado.dto';

export class UpdateMantenimientoLavadoDto extends PartialType(CreateMantenimientoLavadoDto) {}
