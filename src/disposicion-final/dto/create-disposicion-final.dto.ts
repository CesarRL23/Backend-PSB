import { IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDisposicionFinalDto {
  @IsString()
  @IsNotEmpty()
  metodo!: string;

  @IsString()
  @IsNotEmpty()
  empresa_encargada!: string;

  @IsDateString()
  @IsOptional()
  fecha_disposicion?: string;

  @IsString()
  @IsNotEmpty()
  recoleccionId!: string;
}
