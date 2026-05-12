import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpresaFumigadoraDto } from './create-empresa-fumigadora.dto';

export class UpdateEmpresaFumigadoraDto extends PartialType(CreateEmpresaFumigadoraDto) {}
