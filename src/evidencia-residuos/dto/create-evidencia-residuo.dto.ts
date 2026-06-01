import { IsDateString, IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEvidenciaResiduoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipo_archivo!: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  url?: string;

  @IsString()
  @IsNotEmpty()
  descripcion!: string;

  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsString()
  @IsNotEmpty()
  registroResiduoId!: string;
}
