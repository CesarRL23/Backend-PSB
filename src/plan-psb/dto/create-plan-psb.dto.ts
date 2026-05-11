import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreatePlanPsbDto {
  @IsString()
  @IsNotEmpty()
  version?: string;

  @IsString()
  @IsNotEmpty()
  estado?: string;

  @IsString()
  @IsNotEmpty()
  nivel_riesgo?: string;

  @IsDateString()
  fecha_creacion?: Date;

  @IsDateString()
  fecha_modificacion?: Date;
}
