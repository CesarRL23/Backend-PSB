import { IsNotEmpty, IsString, IsOptional, IsDateString, IsEnum } from 'class-validator';
import { EstadoRegistro } from 'src/registro/entities/registro.entity';

export class CreateRegistroResiduoDto {
  @IsString()
  @IsNotEmpty()
  tipo_actividad!: string;

  @IsString()
  @IsNotEmpty()
  resultado_general!: string;

  @IsString()
  @IsNotEmpty()
  programaResiduoId!: string;

  @IsDateString()
  @IsOptional()
  fecha?: string;

  @IsString()
  @IsOptional()
  observaciones?: string;

  @IsString()
  @IsOptional()
  responsable?: string;

  @IsEnum(EstadoRegistro)
  @IsOptional()
  estado?: EstadoRegistro;
}
