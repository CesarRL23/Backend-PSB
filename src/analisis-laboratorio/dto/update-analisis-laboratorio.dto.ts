import { PartialType } from '@nestjs/mapped-types';
import { CreateAnalisisLaboratorioDto } from './create-analisis-laboratorio.dto';

export class UpdateAnalisisLaboratorioDto extends PartialType(CreateAnalisisLaboratorioDto) {}