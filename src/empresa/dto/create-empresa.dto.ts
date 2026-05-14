import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateEmpresaDto {

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  nit!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  direccion!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  tipoNegocio!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  representante!: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  registroSanitarioFuncionamiento?: string;

  @IsString()
  @IsOptional()
  @MaxLength(100)
  resolucionInvima?: string;
}
