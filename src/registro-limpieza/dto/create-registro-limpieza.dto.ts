import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateRegistroLimpiezaDto {

  @IsUUID()
  @IsNotEmpty()
  registroId!: string;

  @IsUUID()
  @IsNotEmpty()
  programaLimpiezaId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  superficieLimpiada!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  resultadoInspeccion?: string;
}
