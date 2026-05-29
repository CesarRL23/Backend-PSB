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

  @IsString()
  @IsOptional()
  concepto?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  coliformesTotalesUfc?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  eColiUfc?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  conductividad?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  durezaTotal?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  nitritos?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  nitratos?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  hierroTotal?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  cloruros?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  sulfatos?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  fluoruros?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  calcio?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  magnesio?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  alcalinidad?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  carbonoOrganicoTotal?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  tensoactivos?: number;
}
