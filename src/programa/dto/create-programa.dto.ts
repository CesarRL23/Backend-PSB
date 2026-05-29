import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { FrecuenciaPrograma } from '../entities/programa.entity';

export class CreateProgramaDto {
  @IsUUID()
  @IsNotEmpty()
  planPsbId!: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  nombre?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  responsable?: string;

  @IsEnum(FrecuenciaPrograma)
  @IsOptional()
  frecuencia?: FrecuenciaPrograma;

  @IsString()
  @IsOptional()
  descripcion?: string;
}
