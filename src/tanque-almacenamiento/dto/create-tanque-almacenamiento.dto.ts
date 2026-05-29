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
  ValidateIf,
} from 'class-validator';

export class CreateTanqueAlmacenamientoDto {

  @IsUUID()
  @IsNotEmpty()
  fuenteAguaId!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  capacidadLitros!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  materialGradoAlimenticio!: string;

  @IsDateString()
  @IsOptional()
  fechaUltimoLavado?: string;

  @IsBoolean()
  @IsOptional()
  tieneTapa?: boolean;

  @ValidateIf((o) => o.tieneTapa === true)
  @IsBoolean()
  @IsNotEmpty()
  tapaBuenEstado?: boolean;

  @IsBoolean()
  @IsOptional()
  llavePaso?: boolean;

  @IsDateString()
  @IsOptional()
  proximaLimpieza?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  tipo?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  ubicacion?: string;
}
