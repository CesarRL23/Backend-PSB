import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { EstadoAccionCorrectiva } from '../entities/accion-correctiva-agua.entity';

export class CreateAccionCorrectivaAguaDto {

  @IsUUID()
  @IsNotEmpty()
  registroAguaId!: string;

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
}