import { IsEnum, IsInt, IsNumber, IsOptional, IsUUID, Min } from 'class-validator';
import { ConcentracionUnidad } from '../entities/paso-limpieza-pq.entity';

export class UpdatePasoLimpiezaPqDto {

  @IsUUID()
  @IsOptional()
  productoQuimicoId?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  concentracionValor?: number;

  @IsEnum(ConcentracionUnidad)
  @IsOptional()
  concentracionUnidad?: ConcentracionUnidad;

  @IsInt()
  @Min(1)
  @IsOptional()
  tiempoContactoMin?: number;
}
