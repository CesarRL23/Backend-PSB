import { PartialType } from '@nestjs/mapped-types';
import { CreateEquipoAreaDto } from './create-equipo-area.dto';

export class UpdateEquipoAreaDto extends PartialType(CreateEquipoAreaDto) {}
