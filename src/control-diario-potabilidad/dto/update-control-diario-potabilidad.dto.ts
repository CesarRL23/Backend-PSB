import { PartialType } from '@nestjs/mapped-types';
import { CreateControlDiarioPotabilidadDto } from './create-control-diario-potabilidad.dto';

export class UpdateControlDiarioPotabilidadDto extends PartialType(CreateControlDiarioPotabilidadDto) {}