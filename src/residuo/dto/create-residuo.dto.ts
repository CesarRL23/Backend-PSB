import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResiduoDto {
  @IsString()
  @IsNotEmpty()
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;

  @IsString()
  @IsNotEmpty()
  programaResiduoId!: string;

  @IsString()
  @IsNotEmpty()
  contenedeorId!: string;

  @IsString()
  @IsNotEmpty()
  tipoResiduoId!: string;

  @IsString()
  @IsNotEmpty()
  areaGenereacionId!: string;
}
