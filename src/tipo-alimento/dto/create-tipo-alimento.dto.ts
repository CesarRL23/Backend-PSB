import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTipoAlimentoDto {
  @IsString()
  @IsNotEmpty()
  nombre?: string;

  @IsString()
  @IsNotEmpty()
  descripcion?: string;

  @IsString()
  @IsNotEmpty()
  nivel_riesgo?: string;
}
export class CreateTipoAlimentoDto {}
