import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

import { TipoParametro } from '../entities/medicion-paso.entity';

export class CreateMedicionPasoDto {

  @IsUUID()
  @IsNotEmpty()
  checklistLimpiezaId!: string;

  @IsEnum(TipoParametro)
  @IsNotEmpty()
  tipoParametro!: TipoParametro;

  @IsNumber()
  @IsNotEmpty()
  valor!: number;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  unidad!: string;

  @IsNumber()
  @IsOptional()
  valorMinimoEsperado?: number;

  @IsNumber()
  @IsOptional()
  valorMaximoEsperado?: number;
}
