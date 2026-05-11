import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoAlimentoDto } from './create-tipo-alimento.dto';

export class UpdateTipoAlimentoDto extends PartialType(CreateTipoAlimentoDto) {}
