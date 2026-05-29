import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  Min,
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

  // ─── Trazabilidad del producto realmente usado ────────────────────────────────

  @IsUUID()
  @IsOptional()
  productoQuimicoId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  loteUsado?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  concentracionReal?: number;

  @IsNumber()
  @Min(0)
  @IsOptional()
  volumenPreparadoLitros?: number;
}
