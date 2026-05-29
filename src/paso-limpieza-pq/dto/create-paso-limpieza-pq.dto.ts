import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsUUID,
  Min,
} from 'class-validator';

import { ConcentracionUnidad } from '../entities/paso-limpieza-pq.entity';

export class CreatePasoLimpiezaPqDto {

  @IsUUID()
  @IsNotEmpty()
  pasoLimpiezaId!: string;

  @IsUUID()
  @IsNotEmpty()
  productoQuimicoId!: string;

  @IsNumber()
  @Min(0)
  concentracionValor!: number;

  @IsEnum(ConcentracionUnidad)
  @IsNotEmpty()
  concentracionUnidad!: ConcentracionUnidad;

  @IsInt()
  @Min(1)
  tiempoContactoMin!: number;
}
