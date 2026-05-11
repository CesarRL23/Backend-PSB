import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
} from 'class-validator';

export class CreatePasoLimpiezaDto {

  @IsUUID()
  @IsNotEmpty()
  programaLimpiezaId!: string;

  @IsInt()
  @Min(1)
  orden!: number;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipoAccion!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  concentracion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  tiempoContacto?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  frecuencia!: string;

  @IsString()
  @IsOptional()
  observaciones?: string;
}
