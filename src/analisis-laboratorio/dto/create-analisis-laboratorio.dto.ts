import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateAnalisisLaboratorioDto {

  @IsUUID()
  @IsNotEmpty()
  fuenteAguaId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  numeroCertificado!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  laboratorioCertificado!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaMuestreo!: string;

  @IsDateString()
  @IsOptional()
  fechaEntregaResultado?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  responsableMuestra!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  puntoMuestreo!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  cloroResidual!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(14)
  ph!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  turbiedad!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(500)
  colorAparente!: number;

  @IsBoolean()
  coliformesTotalesPresentes!: boolean;

  @IsBoolean()
  eColiPresente!: boolean;

  @IsNumber()
  @IsOptional()
  @Min(0)
  mesofilos?: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  linkDocumentoPdf?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  fotoEvidencia?: string;
}
