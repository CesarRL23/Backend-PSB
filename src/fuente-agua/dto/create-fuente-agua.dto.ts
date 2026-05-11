import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
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

  @IsString()
  @IsOptional()
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
}