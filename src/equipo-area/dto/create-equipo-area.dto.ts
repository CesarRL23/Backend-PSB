import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { TipoEquipoArea, EstadoEquipoArea } from '../entities/equipo-area.entity';

export class CreateEquipoAreaDto {

  @IsUUID()
  @IsNotEmpty()
  empresaId!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  nombre!: string;

  @IsEnum(TipoEquipoArea)
  @IsNotEmpty()
  tipo!: TipoEquipoArea;

  @IsEnum(EstadoEquipoArea)
  @IsOptional()
  estado?: EstadoEquipoArea;
}
