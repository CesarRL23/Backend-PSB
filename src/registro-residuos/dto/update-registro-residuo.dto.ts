import { PartialType } from '@nestjs/mapped-types';
import { CreateRegistroResiduoDto } from './create-registro-residuo.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateRegistroResiduoDto extends PartialType(CreateRegistroResiduoDto) {
	@IsOptional()
	@IsString()
	fecha?: string;

	@IsOptional()
	@IsString()
	observaciones?: string;

	@IsOptional()
	@IsString()
	responsable?: string;

	@IsOptional()
	@IsString()
	estado?: string;
}
