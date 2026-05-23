import {
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

export class CreateControlDiarioPotabilidadDto {

  @IsUUID()
  @IsNotEmpty()
  fuenteAguaId!: string;

  @IsUUID()
  @IsOptional()
  registroAguaId?: string;

  @IsDateString()
  @IsNotEmpty()
  fechaHora!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  cloroResidual!: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
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

  @IsNumber()
  @IsOptional()
  @Min(-10)
  @Max(100)
  temperatura?: number;

  @IsString()
  @IsNotEmpty()
  puntoCaptacion!: string;

  @IsString()
  @IsNotEmpty()
  responsableMuestra!: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  evidenciaFoto?: string;
}