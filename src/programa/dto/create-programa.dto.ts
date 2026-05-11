import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

import { TipoPrograma, FrecuenciaPrograma } from '../entities/programa.entity';

export class CreateProgramaDto {

  @IsString()
  @IsNotEmpty()
  planPsbId!: string;

  @IsEnum(TipoPrograma)
  @IsNotEmpty()
  tipo!: TipoPrograma;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  responsable!: string;

  @IsEnum(FrecuenciaPrograma)
  @IsNotEmpty()
  frecuencia!: FrecuenciaPrograma;

  @IsString()
  @IsOptional()
  descripcion?: string;
}