import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
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

  @IsBoolean()
  @IsOptional()
  cumpleNorma?: boolean;
}