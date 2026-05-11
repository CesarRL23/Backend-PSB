import { IsNotEmpty, IsString } from 'class-validator';

export class CreateContenedeorDto {
  @IsString()
  @IsNotEmpty()
  color!: string;

  @IsString()
  @IsNotEmpty()
  capacidad!: string;

  @IsString()
  @IsNotEmpty()
  ubicacion!: string;

  @IsString()
  @IsNotEmpty()
  estado!: string;

  @IsString()
  @IsNotEmpty()
  programaResiduoId!: string;
}
