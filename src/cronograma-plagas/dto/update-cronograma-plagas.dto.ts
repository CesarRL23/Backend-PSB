import { PartialType } from '@nestjs/mapped-types';
import { CreateCronogramaPlagasDto } from './create-cronograma-plagas.dto';

export class UpdateCronogramaPlagasDto extends PartialType(CreateCronogramaPlagasDto) {}
