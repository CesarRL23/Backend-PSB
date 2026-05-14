import { IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';

export class CreateProgramaLimpiezaDto {

  @IsUUID()
  @IsNotEmpty()
  programaId!: string;

  @IsUUID()
  @IsOptional()
  equipoAreaId?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  objetivo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  alcance!: string;

  @IsString()
  @IsOptional()
  procedimientoGeneral?: string;
}
