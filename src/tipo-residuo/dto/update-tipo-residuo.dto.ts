import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoResiduoDto } from './create-tipo-residuo.dto';

export class UpdateTipoResiduoDto extends PartialType(CreateTipoResiduoDto) {}
