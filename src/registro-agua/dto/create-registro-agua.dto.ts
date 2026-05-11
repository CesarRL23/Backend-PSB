import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
} from 'class-validator';

import { TipoActividadAgua, ResultadoGeneralAgua } from '../entities/registro-agua.entity';

export class CreateRegistroAguaDto {

  @IsUUID()
  @IsNotEmpty()
  registroId!: string;

  @IsUUID()
  @IsNotEmpty()
  programaAguaId!: string;

  @IsEnum(TipoActividadAgua)
  @IsNotEmpty()
  tipoActividad!: TipoActividadAgua;

  @IsEnum(ResultadoGeneralAgua)
  @IsOptional()
  resultadoGeneral?: ResultadoGeneralAgua;
}