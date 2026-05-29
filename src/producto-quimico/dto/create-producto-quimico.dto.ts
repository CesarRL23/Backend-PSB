import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateProductoQuimicoDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  codigo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(150)
  fabricante!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipo!: string;

  @IsBoolean()
  @IsOptional()
  gradoAlimenticio?: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  ph?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  concentracionRecomendada?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  tiempoContactoMin?: string;

  @IsString()
  @IsOptional()
  fichaTecnicaUrl?: string;
}
