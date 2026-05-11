import { IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class UpdatePasoLimpiezaPqDto {

  @IsUUID()
  @IsOptional()
  productoQuimicoId?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  concentracion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  tiempoContacto?: string;
}
