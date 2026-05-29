import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
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

  @IsString()
  @IsOptional()
  @MaxLength(100)
  periodo?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  responsable?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  @Max(100)
  porcentajeCumplimiento?: number;

  @IsString()
  @IsOptional()
  reporte?: string;

  @IsDateString()
  @IsOptional()
  fechaCierre?: string;
}
