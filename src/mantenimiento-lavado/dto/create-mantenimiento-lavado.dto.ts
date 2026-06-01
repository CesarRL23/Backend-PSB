import {
  IsBoolean,
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
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

  @IsString()
  @IsOptional()
  @MaxLength(100)
  tipoLimpieza?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  productoUtilizado?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  concentracionProducto?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  tiempoContacto?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  volumenAgua?: number;

  @IsString()
  @IsOptional()
  proceso?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  responsable?: string;

  @IsDateString()
  @IsOptional()
  proximaLimpieza?: string;

  @IsBoolean()
  @IsOptional()
  cumple?: boolean;
}
