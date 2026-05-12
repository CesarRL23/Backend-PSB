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
}