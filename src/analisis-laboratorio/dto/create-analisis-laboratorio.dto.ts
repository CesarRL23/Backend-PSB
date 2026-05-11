import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAnalisisLaboratorioDto {

  @IsUUID()
  @IsNotEmpty()
  fuenteAguaId!: string;

  @IsUUID()
  @IsOptional()
  registroAguaId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  numeroCertificado!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaMuestreo!: string;

  @IsBoolean()
  @IsOptional()
  coliformesTotales?: boolean;

  @IsBoolean()
  @IsOptional()
  eColi?: boolean;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mesofilos?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  irca?: number;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  nivelRiesgo?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  resultado?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  linkDocumentoPdf?: string;
}