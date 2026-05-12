import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateRecoleccionDto {
  @IsDateString()
  @IsNotEmpty()
  fecha!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  responsable!: string;

  @IsNumber()
  @IsNotEmpty()
  cantidad_recolectada!: number;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  observaciones?: string;

  @IsString()
  @IsNotEmpty()
  registroResiduoId!: string;
}
