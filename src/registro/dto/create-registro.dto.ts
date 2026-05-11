import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

import { EstadoRegistro } from '../entities/registro.entity';

const HORA_REGEX = /^([01]\d|2[0-3]):([0-5]\d)(:[0-5]\d)?$/;
const HORA_MSG   = 'El formato debe ser HH:MM o HH:MM:SS';

export class CreateRegistroDto {

  @IsString()
  @IsNotEmpty()
  programaId!: string;

  @IsString()
  @IsNotEmpty()
  usuarioId!: string;

  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsOptional()
  @Matches(HORA_REGEX, { message: `horaInicio: ${HORA_MSG}` })
  horaInicio?: string;

  @IsString()
  @IsOptional()
  @Matches(HORA_REGEX, { message: `horaFin: ${HORA_MSG}` })
  horaFin?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  evidenciaFoto?: string;

  @IsEnum(EstadoRegistro)
  @IsOptional()
  estado?: EstadoRegistro;
}