import { PartialType } from '@nestjs/mapped-types';
import { CreateInsumoQuimicoDto } from './create-insumo-quimico.dto';

export class UpdateInsumoQuimicoDto extends PartialType(CreateInsumoQuimicoDto) {}
