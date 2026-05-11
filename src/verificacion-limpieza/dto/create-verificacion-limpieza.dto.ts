import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateVerificacionLimpiezaDto {

  @IsUUID()
  @IsNotEmpty()
  registroLimpiezaId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  resultado!: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  unidad?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  limiteAceptable?: string;

  @IsString()
  @IsOptional()
  metodoValidacion?: string;

  @IsUUID()
  @IsNotEmpty()
  responsableId!: string;

  @IsDateString()
  @IsNotEmpty()
  fechaPrueba!: string;
}
