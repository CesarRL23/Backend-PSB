import { IsNotEmpty,IsNumber,IsString,Max,MaxLength,Min} from 'class-validator';

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
}
