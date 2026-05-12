import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroPlagasDto } from './create-registro-plagas.dto';

export class UpdateRegistroPlagasDto extends PartialType(CreateRegistroPlagasDto) {}
