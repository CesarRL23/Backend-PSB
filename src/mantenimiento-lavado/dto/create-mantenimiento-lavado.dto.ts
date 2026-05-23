import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { EstadoMantenimiento } from '../entities/mantenimiento-lavado.entity';

export class CreateMantenimientoLavadoDto {

  @IsUUID()
  @IsNotEmpty()
  fuenteAguaId!: string;

  @IsUUID()
  @IsOptional()
  registroAguaId?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaProgramada!: string;

  @IsDateString()
  @IsOptional()
  fechaEjecucion?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  metodoLimpieza!: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsEnum(EstadoMantenimiento)
  @IsOptional()
  estado?: EstadoMantenimiento;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  evidenciaFoto?: string;
}