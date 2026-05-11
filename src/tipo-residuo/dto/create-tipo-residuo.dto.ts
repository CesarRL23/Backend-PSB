import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoResiduoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  color_contenedor!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsBoolean()
  @IsNotEmpty()
  es_peligroso!: boolean;

  @IsString()
  @IsNotEmpty()
  programaResiduoId!: string;
}
