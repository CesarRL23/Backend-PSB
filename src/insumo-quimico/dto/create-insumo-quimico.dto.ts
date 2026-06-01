import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateInsumoQuimicoDto {

  @IsUUID()
  @IsNotEmpty()
  mantenimientoId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre!: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  registroSanitarioInvima?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  lote?: string;

  @IsDateString()
  @IsOptional()
  fechaVencimiento?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  concentracion?: number;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  fabricante?: string;

  @IsString()
  @IsOptional()
  @MaxLength(200)
  uso?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  stock?: number;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  unidad?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  fichaTecnica?: string;

  @IsString()
  @IsOptional()
  condicionesAlmacenamiento?: string;
}
