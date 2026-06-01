import { IsBoolean, IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  usuario_id!: string;

  @IsString()
  @IsOptional()
  programa_id?: string;

  @IsString()
  @IsOptional()
  registro_id?: string;

  @IsString()
  @IsOptional()
  remitente_id?: string;

  @IsString()
  @IsNotEmpty()
  tipo!: string;

  @IsString()
  @IsNotEmpty()
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  mensaje!: string;

  @IsDateString()
  fecha_envio!: string;

  @IsDateString()
  @IsOptional()
  fecha_limite?: string;

  @IsBoolean()
  @IsOptional()
  leida?: boolean;

  @IsString()
  @IsOptional()
  estado?: string;
}