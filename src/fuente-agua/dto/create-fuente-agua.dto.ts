import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator';

export class CreateFuenteAguaDto {

  @IsUUID()
  @IsNotEmpty()
  programaAguaId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipo!: string;

  @ValidateIf((o) => o.tipo === 'red_publica')
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  proveedor?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  ubicacion?: string;

  @IsBoolean()
  @IsOptional()
  requiereTanque?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  estado?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  municipio?: string;

  @IsString()
  @IsOptional()
  @MaxLength(150)
  departamento?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  concesion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  tratamiento?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  evidenciaFoto?: string;
}
