import { PartialType } from '@nestjs/mapped-types';
import { CreateFuenteAguaDto } from './create-fuente-agua.dto';

export class UpdateFuenteAguaDto extends PartialType(CreateFuenteAguaDto) {}