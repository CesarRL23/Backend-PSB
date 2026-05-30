import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreatePlanPsbDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  nivel_riesgo: string;

  @IsString()
  version: string;

  @IsString()
  estado: string;

  @IsBoolean()
  @IsOptional()
  activo?: boolean;

  @IsUUID()
  empresaId: string;

  @IsInt()
  @IsOptional()
  tipoAlimentoId?: number;
}