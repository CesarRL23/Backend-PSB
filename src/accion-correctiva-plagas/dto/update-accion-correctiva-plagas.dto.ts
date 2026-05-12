import { PartialType } from '@nestjs/mapped-types';
import { CreateAccionCorrectivaPlagasDto } from './create-accion-correctiva-plagas.dto';

export class UpdateAccionCorrectivaPlagasDto extends PartialType(CreateAccionCorrectivaPlagasDto) {}
