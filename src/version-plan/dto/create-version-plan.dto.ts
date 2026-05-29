import { IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateVersionPlanDto {
  @IsString()
  version?: string;

  @IsString()
  cambios?: string;

  @IsOptional()
  @IsDateString()
  fecha?: Date;
}
