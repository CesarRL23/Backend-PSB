import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroAguaDto } from './create-registro-agua.dto';

export class UpdateRegistroAguaDto extends PartialType(CreateRegistroAguaDto) {}