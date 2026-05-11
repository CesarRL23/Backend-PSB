import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateChecklistLimpiezaDto {

  @IsUUID()
  @IsNotEmpty()
  registroLimpiezaId!: string;

  @IsUUID()
  @IsNotEmpty()
  pasoLimpiezaId!: string;

  @IsBoolean()
  @IsOptional()
  productoCorrecto?: boolean;

  @IsBoolean()
  @IsOptional()
  concentracionCorrecta?: boolean;

  @IsBoolean()
  @IsOptional()
  superficieCubierta?: boolean;

  @IsBoolean()
  @IsOptional()
  tiempoCumplido?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  estado?: string;

  @IsString()
  @IsOptional()
  observacion?: string;
}
