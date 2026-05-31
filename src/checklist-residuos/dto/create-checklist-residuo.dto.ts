import { IsNotEmpty, IsNumber, IsString, Max, MaxLength, Min } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateChecklistResiduoDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  titulo!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  descripcion!: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  @Max(100)
  porcentaje_cumplimiento!: number;

  // ID del registro de residuo al que pertenece este checklist
  @Transform(({ value }) => value?.toString())
  @IsString()
  @IsNotEmpty()
  registroResiduoId!: string;
}
