import { IsNotEmpty, IsString } from 'class-validator';

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
}
