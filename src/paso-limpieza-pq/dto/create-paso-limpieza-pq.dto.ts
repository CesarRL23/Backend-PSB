import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreatePasoLimpiezaPqDto {

  @IsUUID()
  @IsNotEmpty()
  pasoLimpiezaId!: string;

  @IsUUID()
  @IsNotEmpty()
  productoQuimicoId!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  concentracion?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  tiempoContacto?: string;
}
