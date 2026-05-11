import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProgramaAguaDto {
  @IsUUID()
  @IsNotEmpty()
  programaId!: string;

  @IsString()
  @IsNotEmpty()
  objetivo!: string;

  @IsString()
  @IsNotEmpty()
  alcance!: string;

  @IsString()
  @IsNotEmpty()
  procedimientoGeneral!: string;
}
