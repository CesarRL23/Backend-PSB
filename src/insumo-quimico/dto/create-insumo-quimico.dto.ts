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
}