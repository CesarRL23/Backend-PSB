import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreatePlanPsbDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  descripcion: string;

  @IsString()
  nivel_riesgo: string;

  @IsString()
  version: string;
@IsString()
  estado: string;



  @IsBoolean()
  activo: boolean;

  @IsNumber()
  empresaId: number;
}