import { PartialType } from '@nestjs/mapped-types';
import { CreateResiduoDto } from './create-residuo.dto';

export class UpdateResiduoDto extends PartialType(CreateResiduoDto) {}
