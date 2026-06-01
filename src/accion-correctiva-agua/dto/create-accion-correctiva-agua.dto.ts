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
} from 'class-validator';

import { EstadoAccionCorrectiva } from '../entities/accion-correctiva-agua.entity';

export class CreateAccionCorrectivaAguaDto {

  @IsUUID()
  @IsNotEmpty()
  fuenteAguaId!: string;

  @IsUUID()
  @IsOptional()
  registroAguaId?: string;

  @IsString()
  @IsNotEmpty()
  descripcionDesviacion!: string;

  @IsString()
  @IsNotEmpty()
  medidaTomada!: string;

  @IsString()
  @IsOptional()
  resultadoVerificacion?: string;

  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  responsable!: string;

  @IsEnum(EstadoAccionCorrectiva)
  @IsOptional()
  estado?: EstadoAccionCorrectiva;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  evidenciaFoto?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  parametroIncumplido?: string;

  @IsNumber()
  @IsOptional()
  valorMedido?: number;

  @IsNumber()
  @IsOptional()
  valorEsperado?: number;

  @IsString()
  @IsOptional()
  causaRaiz?: string;

  @IsString()
  @IsOptional()
  accionInmediata?: string;

  @IsString()
  @IsOptional()
  accionCorrectiva?: string;

  @IsDateString()
  @IsOptional()
  fechaLimite?: string;

  @IsString()
  @IsOptional()
  verificacionEficacia?: string;

  @IsBoolean()
  @IsOptional()
  eficaz?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  origen?: string;
}
